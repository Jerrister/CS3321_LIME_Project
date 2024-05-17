import neo4j from "neo4j-driver"


var neo4j = require('neo4j-driver');
(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = 'bolt://localhost:7687';
  const USER = 'neo4j'
  const PASSWORD = '11111111'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
})();


// export default function Neo4jAsk(){
//     // TODO: 修改这个函数，架起用户界面的桥梁
//     // Get the name of all 42 year-olds
//     const { records, summary, keys } = driver.executeQuery(
//         'MATCH (p:Person {age: $age}) RETURN p.name AS name',
//         { age: 42 },
//         { database: 'neo4j' }
//     )
    
//     // Summary information
//     console.log(
//         `>> The query ${summary.query.text} ` +
//         `returned ${records.length} records ` +
//         `in ${summary.resultAvailableAfter} ms.`
//     )
    
//     // Loop through results and do something with them
//     console.log('>> Results')
//     for(record of records) {
//         console.log(record.get('name'))
//     }
// }

// 假设 driver 已经被正确初始化和配置
async function Neo4jAsk(query, params = {}) {
  // 输入是查询语句和语句中需要用到的参数，比如：
  // const query = 'MATCH (p:Person {age: $age}) RETURN p.name AS name';
  // const params = { age: 42 };
  // 以下是调用示例：
  // Neo4jAsk(query, params).then(results => {
  //     console.log('Query results:', results);
  // }).catch(error => {
  //     console.error('Error during Neo4j query:', error);
  // });

  const session = driver.session({ database: 'neo4j' });
  try {
      // 执行Cypher查询
      const result = await session.run(query, params);
      const records = result.records; 
      // 可以通过record.get('propertyName')方法访问查询中指定的返回值。
      // 例如，如果你的Cypher查询是RETURN p.name AS name，你可以通过record.get('name')来获取每个记录中的name属性。
      const summary = result.summary; 
      // 定义：summary 是查询完成后返回的摘要信息，它包含了关于执行查询的一些统计和元信息，比如查询消耗的时间、查询的文本等。
      // 属性：
      // query.text：执行的Cypher查询的文本。
      // resultAvailableAfter：数据库在返回第一个结果之前花费的时间（毫秒）。
      // resultConsumedAfter：数据库完成查询处理的总时间。
      // 更多详细信息，取决于查询的性质和数据库的状态。

      console.log(`>> The query ${summary.query.text} returned ${records.length} records in ${summary.resultAvailableAfter} ms.`);

      // 处理并返回结果
      // const results = records.map(record => {
      //     return record.get('name'); // 假设我们关心的是'name'属性
      // });

      const results = records // 我想把这个函数作为通用的返回函数，之后怎么map由具体的应用决定。 

      console.log('>> Results', results);
      return results; // 返回查询到的结果数组
  } catch (error) {
      console.error('Error executing query:', error);
      throw error; // 重新抛出错误，允许调用者处理错误
  } finally {
      await session.close(); // 确保session被关闭
  }
}


