import {Form, useLoaderData} from "react-router-dom";
import { Neo4jAsk } from "./neo4jService";



// TODO load 对应tag和 class的data
export async function loader(){
    // const reference_list = await get_data(params.TagsId),
    const query = 'MATCH (p:Paper) RETURN p.year AS year, COUNT(*) AS cnt'
    const result = await Neo4jAsk(query, {})
    const reference_list = result.map(record => {
            return {
              year: record.get('year').toInt(), // 将年份转换为整数
              value: record.get('cnt').toInt(), // 将数量转换为整数
              sales: 0
            };
        })

    return reference_list

    // const literature_list = [
    //     { year: 2010, value: 40, sales: 100 },
    //     { year: 2011, value: 50, sales: 120 },
    //     { year: 2012, value: 55, sales: 150 },
    //     { year: 2013, value: 70, sales: 180 },
    //     { year: 2014, value: 90, sales: 220 },
    //     { year: 2015, value: 100, sales: 240 }
    //   ];

    // return literature_list;


}

