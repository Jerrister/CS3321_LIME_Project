import {Form, useLoaderData} from "react-router-dom";
import { Neo4jAsk } from "./neo4jService";



// TODO load 对应tag和 class的data
export async function loader({params}){

    console.log("Params for the loader are:", params);
    const cur_tag = params.tagsid;
    // const query = 'MATCH (p:Paper) RETURN p LIMIT 100';
    const query = `
    MATCH (p:Paper)-[:BELONGS_TO]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $tag})
    RETURN p
    `;
    const result = await Neo4jAsk(query, {tag : cur_tag})
    const reference_list = result.map(record => {
            const node = record.get('p');  // 获取节点
            // console.log(node.properties);
            return {
                title: node.properties.title,
                year: node.properties.year.toInt(),
                source: node.properties.journal,
            };
        })
    
    return new Map([
        ['reference_list', reference_list],
        ['BigTag',  params.tagsid],
      ]);

}

    // const reference_list = [
    //     {"title": "Title0", "year": 2022, "source":"http"  }, 
    //     {"title": "Title1", "year": 2024, "source":"http"  }, 
    //     {"title": "Title2", "year": 2023, "source":"http"  }, 
    // ]

    // const reference_list = [
    //     {"authors": "Authors_1,Authors_1,Authors_1,Authors_1,Authors_1, ", "year": 2022, "source":"http" , "file": "/" }, 
    //     {"authors": "Authors_2", "year": 2023, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_3", "year": 2031, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_4", "year": 2019, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_5", "year": 2033, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_6", "year": 2033, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_4", "year": 2019, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_5", "year": 2033, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_6", "year": 2033, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_4", "year": 2019, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_5", "year": 2033, "source":"https" , "file": "/a" }, 
    //     {"authors": "Authors_6", "year": 2033, "source":"https" , "file": "/a" }, 
    // ]