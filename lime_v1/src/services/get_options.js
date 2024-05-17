// TODO according different BIG Tags
import { Neo4jAsk } from "./neo4jService";

function convertNeo4jIntegerToInt(neo4jInteger) {
  return neo4jInteger.low + neo4jInteger.high * Math.pow(2, 32);
}

function buildTree(results) {
  const nodesById = new Map();
  const rootNodes = [];

  // 初始化节点
  results.forEach(result => {
      // console.log("current item: ", result);
      const id = convertNeo4jIntegerToInt(result.get('id'));
      const name = result.get('name');  
      console.log("current item name: ", name);
      
      nodesById.set(id, {
          value: id,  // 将id作为value
          label: name,  // 将name作为label
          children: []
      });
  });
  console.log("All tags are ", nodesById);

  // 构建父子关系
  results.forEach(result => {
      const id = convertNeo4jIntegerToInt(result.get('id'));
      const parentIds = result.get('parentIds').map(id => convertNeo4jIntegerToInt(id));
      const node = nodesById.get(id);
      console.log("Current node is ", id, node);

      if (parentIds.length > 0) {
          const parentNode = nodesById.get(parentIds[0]);
          console.log("current parent is ", parentNode);
          if (!parentNode.children.some(child => child.value === node.value)) {
              parentNode.children.push(node);
          }
      } else {
          // 没有父ID
          console.log("This is the root.");
          if (!rootNodes.some(root => root.value === node.value)) {
              rootNodes.push(node); // 添加为根节点
          }
      }
  });
  console.log("The returned tree is ", rootNodes);
  return rootNodes;
}




export default async function GetOptions(InselectedValues) {
    console.log("Inselected elements are:", InselectedValues);
    const bigTag = InselectedValues[0]
    const query = `
    MATCH (child:Tag)-[:IN]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $bigTag})
    RETURN child.tag_name AS name, ID(child) AS id, COLLECT(ID(parent)) AS parentIds
    UNION
    MATCH (child:Tag)-[:IN*0]->(root:Tag {tag_name: $bigTag})
    RETURN child.tag_name AS name, ID(child) AS id, [] AS parentIds
    `;
    const params = {bigTag : bigTag}
    try {
        const records = await Neo4jAsk(query, params);
        const tree = buildTree(records);
        return tree;
    } catch (error) {
        console.error("Error fetching and building tree:", error);
        return []; // 返回空数组或错误信息
    }
}


// import { Neo4jAsk } from "./neo4jService";



// async function buildTree(paths) {
//   const idToNodeMap = new Map();

//   paths.forEach(path => {
//       let lastNode = null;

//       path.forEach((node, index) => {
//           const nodeId = node.identity.toString();
//           if (!idToNodeMap.has(nodeId)) {
//               // 创建新节点
//               const newNode = {
//                   value: nodeId,
//                   label: node.properties.tag_name,
//                   children: []
//               };
//               idToNodeMap.set(nodeId, newNode);

//               // 如果不是根节点，将其添加为父节点的子节点
//               if (lastNode) {
//                   lastNode.children.push(newNode);
//               }
//           }

//           // 更新最后处理的节点引用
//           lastNode = idToNodeMap.get(nodeId);
//       });
//   });

//   // 假设根节点已知，并从字典中获取
//   return Array.from(idToNodeMap.values()).filter(node => node.children.length > 0);
// }

// export default async function GetOptions( InselectedValues ) {

//   const options = [ // 这是一个示例的 options 数组，你可以根据你的需求进行修改
//   {
//     value: 'level1',
//     label: 'Level 1',
//     children: [
//       {
//         value: 'level1-1',
//         label: 'Level 1-1',
//         children: [
//           {
//             value: 'level1-1-1',
//             label: 'Level 1-1-1',
//           },
//           {
//             value: 'level1-1-2',
//             label: 'Level 1-1-2',
//           },
//         ],
//       },
//       {
//         value: 'level1-2',
//         label: 'Level 1-2',
//       },
//     ],
//   },
//   {
//     value: 'level2',
//     label: 'Level 2',
//     children: [
//       {
//         value: 'level2-1',
//         label: 'Level 2-1',
//       },
//       {
//         value: 'level2-2',
//         label: 'Level 2-2',
//       },
//     ],
//   },
// ];
//     return(
//       options
//     )
// }