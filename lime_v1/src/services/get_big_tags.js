import { Neo4jAsk } from "./neo4jService";

export default async function getBigTags() {
    const query = "MATCH (root:Tag {tag_name : 'All Tags'})<-[:IN]-(child:Tag) RETURN child.tag_name";
    // 返回 Promise，这样调用者就可以在 Promise 解决后使用数据
    return Neo4jAsk(query, {}).then(records => {
        let result = records.map(record => record.get('child.tag_name'));
        result.unshift('All Tags');
        console.log("All tag names:", result);
        return result; // 现在返回处理后的数据数组
    }).catch(error => {
        console.error("Error fetching big tags:", error);
        return []; // 发生错误时返回空数组
    });
}
