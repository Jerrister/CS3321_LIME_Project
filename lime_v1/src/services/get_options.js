// TODO according different BIG Tags
import { configConsumerProps } from "antd/es/config-provider";
import { Neo4jAsk } from "./neo4jService";

// function convertNeo4jIntegerToInt(neo4jInteger) {
//   return neo4jInteger.low + neo4jInteger.high * Math.pow(2, 32);
// }

function buildTree(results) {
//   const nodesById = new Map();
  const nodesByName = new Map();
  const rootNodes = [];

  // 初始化节点
  results.forEach(result => {
      // console.log("current item: ", result);
    //   const id = convertNeo4jIntegerToInt(result.get('id'));
      const name = result.get('name');  
    //   console.log("current item name: ", name);
      
    //   nodesById.set(id, {
    //       value: id,  // 将id作为value
    //       label: name,  // 将name作为label
    //       children: []
    //   });
      nodesByName.set(name, {
        value: name,  // 将id作为value
        label: name,  // 将name作为label
        children: []
    });
  });
//   console.log("All tags are ", nodesById);
//   console.log("All tags are ", nodesByName);

  // 构建父子关系
  results.forEach(result => {
    //   const id = convertNeo4jIntegerToInt(result.get('id'));
    const name = result.get('name');  
    //   const parentIds = result.get('parentIds').map(id => convertNeo4jIntegerToInt(id));
      const parentNames = result.get('parentNames')
    //   const node = nodesById.get(id);
      const node = nodesByName.get(name);
    //   console.log("Current node is ", id, node);
    //   console.log("Current node is ", name, node);

    //   if (parentIds.length > 0) {
      if (parentNames.length > 0) {
        //   const parentNode = nodesById.get(parentIds[0]);
          const parentNode = nodesByName.get(parentNames[0]);
        //   console.log("current parent is ", parentNode);
          if (!parentNode.children.some(child => child.value === node.value)) {
              parentNode.children.push(node);
          }
      } else {
          // 没有父ID
        //   console.log("This is the root.");
          if (!rootNodes.some(root => root.value === node.value)) {
              rootNodes.push(node); // 添加为根节点
          }
      }
  });
//   console.log("The returned tree is ", rootNodes);
//   console.log("The test tree is ", rootNodes[0].children);
  return rootNodes;
//   return rootNodes[0].children;
}




export default async function GetOptions(InselectedValues) {
    console.log("Inselected elements are:", InselectedValues);

    const bigTag = InselectedValues[0]

    const query = `
    MATCH (child:Tag)-[:IN]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $bigTag})
    RETURN child.tag_name AS name, COLLECT(parent.tag_name) AS parentNames
    UNION
    MATCH (child:Tag)-[:IN*0]->(root:Tag {tag_name: $bigTag})
    RETURN child.tag_name AS name, [] AS parentNames
    `;
    const params = {bigTag : bigTag}
    try {
        const records = await Neo4jAsk(query, params);
        const tree = buildTree(records);
        // console.log("The option is ", options);
        return tree;
    } catch (error) {
        console.error("Error fetching and building tree:", error);
        return []; // 返回空数组或错误信息
    }
}

export async function GetCutOptions(InselectedValues, CutTag) {
  console.log("Inselected elements are:", InselectedValues, CutTag);

  const bigTag = InselectedValues[0]
  // const query = `
  // MATCH (child:Tag)-[:IN]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $bigTag})
  // RETURN child.tag_name AS name, ID(child) AS id, COLLECT(ID(parent)) AS parentIds
  // UNION
  // MATCH (child:Tag)-[:IN*0]->(root:Tag {tag_name: $bigTag})
  // RETURN child.tag_name AS name, ID(child) AS id, [] AS parentIds
  // `;

  const query = `
      MATCH (child:Tag)-[:IN]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $bigTag})
      RETURN child.tag_name AS name, COLLECT(parent.tag_name) AS parentNames
      UNION
      MATCH (child:Tag)-[:IN*0]->(root:Tag {tag_name: $bigTag})
      RETURN child.tag_name AS name, [] AS parentNames
    `;
  const params_all = {bigTag : bigTag}
  const params_cut = {bigTag : CutTag}
  try {
      const all_records = await Neo4jAsk(query, params_all);
      const cut_records = await Neo4jAsk(query, params_cut);

      const allTags = all_records.map(record => record.get('name'));
      const cutTags = cut_records.map(record => record.get('name'));

      console.log("All:", allTags);
      console.log("Cut:", cutTags);
      // Compute the difference
      const filteredTags = allTags.filter(tag => !cutTags.includes(tag));

      // Assuming buildTree needs records, re-map the filtered names to a suitable structure if necessary
      const filteredRecords = all_records.filter(record => filteredTags.includes(record.get('name')));

      const tree = buildTree(filteredRecords);
      console.log("The option is ", tree);
      return tree;
  } catch (error) {
      console.error("Error fetching and building tree:", error);
      return []; // 返回空数组或错误信息
  }
}