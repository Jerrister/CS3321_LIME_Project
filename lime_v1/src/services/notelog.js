import {Form, useLoaderData} from "react-router-dom";
import { Neo4jAsk } from "./neo4jService";




// TODO load 对应tag和 class的data
export async function loader(){

    
    const query = `
    MATCH (n:Note)
    WHERE n.build_time IS NOT NULL
    WITH n, split(n.build_time, '/') AS date_parts
    WITH n, date_parts[0] AS year, date_parts[1] AS month
    RETURN year, month, count(n) AS cnt
    ORDER BY year, month
    `
    const result = await Neo4jAsk(query, {})
    // console.log(result)
    const notelog_list = result.map(record => {
            return {
              year: record.get('year')+'-'+record.get('month'), // 将年份转换为整数
              value: record.get('cnt').toInt(), // 将数量转换为整数
              sales: 0
            };
        })
    // console.log(notelog_list)

    return notelog_list

    // return notelog_list;


}

