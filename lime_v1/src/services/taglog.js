import {Form, useLoaderData} from "react-router-dom";
import { Neo4jAsk } from "./neo4jService";
import * as d3 from 'd3';

var myColor = d3.scaleSequential(d3.interpolateViridis).domain([1, 15]);


// TODO load 对应tag和 class的data
export async function loader(){
    // const reference_list = await get_data(params.TagsId),
    // const data = [
    //   { tag: "JavaScript", value: 100, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" },
    //   { tag: "JavaScript", value: 30, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" },
    //   { tag: "JavaScript", value: 30, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" },
    //   { tag: "JavaScript", value: 30, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" },
    //   { tag: "JavaScript", value: 30, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" },
    //   { tag: "JavaScript", value: 30, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" },
    //   { tag: "JavaScript", value: 30, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" },
    //   { tag: "JavaScript", value: 30, color: "pink" },
    //   { tag: "React", value: 40, color: "lightblue" },
    //   { tag: "D3", value: 50, color: "lightgreen" }
    // ];

    const query = `
    MATCH (tag:Tag)
    WITH DISTINCT tag
    OPTIONAL MATCH (tag)<-[:BELONGS_TO]-(entity)
    WITH DISTINCT tag, entity
    OPTIONAL MATCH (tag)<-[:IN*]-(:Tag)<-[:BELONGS_TO]-(subentity)
    WITH DISTINCT tag, entity, subentity
    RETURN tag, COUNT(DISTINCT entity) + COUNT(DISTINCT subentity) AS cnt     
    `
    
    const result = await Neo4jAsk(query, {})
    const data = result.map(record => {
            var at = 2*Math.atan(record.get('cnt').toInt()/25);
            var r = 70*at+30;
            var c = 14*at;
            return {
              tag: record.get('tag').properties.tag_name,
              value: record.get('cnt').toInt(), // 将数量转换为整数
              radius: r, 
              color: myColor(c)
            };
        })
    console.log(data)

    return data;


}

