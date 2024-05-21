import {Form, useLoaderData} from "react-router-dom";
import { Neo4jAsk } from "./neo4jService";


function check_date(node, startDate, endDate) {
    // 如果startDate和endDate都是undefined，直接返回true
    console.log("time check input", startDate, endDate);
    if (startDate === "undefined") {
        return true;
    }
    

    // 解码并转换startDate和endDate
    const decodedStartDate = startDate ? decodeURIComponent(startDate) : undefined;
    const decodedEndDate = endDate ? decodeURIComponent(endDate) : undefined;

    // 创建Date对象，将时间设置为开始日期的00:00:00，结束日期的23:59:59
    const start = decodedStartDate ? new Date(decodedStartDate) : undefined;
    const end = decodedEndDate ? new Date(decodedEndDate) : undefined;

    if (start) start.setHours(23, 59, 59, 999);  // 设置开始时间为00:00:00
    if (end) end.setHours(23, 59, 59, 999); // 设置结束时间为23:59:59

    end.setDate(end.getDate()+1);

    // 获取build_time并转换为Date对象
    if (!node.properties || !node.properties.build_time) {
        console.log("Node does not have a build_time property.");
        return false;
    }

    const buildTime = node.properties.build_time;
    const buildDate = new Date(buildTime);

    // 检查buildDate的有效性
    if (isNaN(buildDate.getTime())) {
        console.log("Invalid build_time format:", buildTime);
        return false;
    }

    // 检查日期范围
    const flag = (!start || buildDate >= start) && (!end || buildDate <= end);
    console.log("time check output", buildTime, start, end, flag)

    return flag
}


// TODO load 对应tag和 class的data
export async function loader(selectedValues, Content){

    console.log("Params for the loader are:", selectedValues);
    const cur_tag = selectedValues[selectedValues.length-1];
    console.log("Selected Params for the loader are:", cur_tag);
    // const query = 'MATCH (p:Paper) RETURN p LIMIT 100';
    

    let reference_list = []
    console.log("Content:" , Content);
    console.log("Content Bool:" , Content === "Paper");

    if (Content === "Notebook")
    {
        const query = `
            MATCH (n:Note)-[:BELONGS_TO]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $tag})
            RETURN DISTINCT n
            ORDER BY n.build_time DESC
            `;
        const result = await Neo4jAsk(query, {tag : cur_tag})
        console.log("in dataloader, select values:",  result);
        reference_list = result.map(record => {
            const node = record.get('n');  // 获取节点
            // console.log(node.properties);
            return {
                title: node.properties.name,
                path: node.properties.path,
                "build time": "2024/05/21 10:36:30",
                };
        })
    }
    else
    {
        const query = `
            MATCH (p:Paper)-[:BELONGS_TO]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $tag})
            RETURN DISTINCT p
            ORDER BY p.build_time DESC
            `;
        const result = await Neo4jAsk(query, {tag : cur_tag})
        console.log("in dataloader, select values:",  result);
        reference_list = result.map(record => {
            const node = record.get('p');  // 获取节点
            // console.log(node.properties);
            const year = typeof(node.properties.year) === "string"
                     ? parseInt(node.properties.year)
                     : node.properties.year.toInt();
            return {
                        title: node.properties.title,
                        year: year,
                        source: node.properties.journal,
                    };
        })
        // console.log("jiaxin test:", reference_list);
    }

    // const reference_list = [
    //     {"title": "Title0", "year": 2022, "source":"http"  }, 
    //     {"title": "Title1", "year": 2024, "source":"http"  }, 
    //     {"title": "Title2", "year": 2023, "source":"http"  }, 
    // ]
    
    return new Map([
        ['reference_list', reference_list],
        ['BigTag',  selectedValues[0]],
      ]);
}


export async function searcher(selectedValues, Content, requestData){

    console.log("Params for the loader are:", selectedValues, requestData);
    console.log("Content:" , Content);
    console.log("Content Bool:" , Content === "Paper");

    var query = ``;
    var params = {};

    let reference_list = []
    console.log("Content:" , Content);
    console.log("Content Bool:" , Content === "Paper");

    if (Content === "Notebook")
    {
        if (requestData.searchField === "Tag") {
            query = `
            MATCH (n:Note)-[:BELONGS_TO]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $tag})
            RETURN DISTINCT n
            ORDER BY n.build_time DESC
            `;
            params = {tag : requestData.searchValue};
        }
        else if (requestData.searchField == "Title") {
            query = `
            MATCH (n:Note) WHERE n.name=~$name
            RETURN DISTINCT n
            ORDER BY n.build_time DESC
            `;
            params = {name : `(?i).*${requestData.searchValue}.*`};
        }
        else {
            query = `
            MATCH (n:Note)
            RETURN n
            ORDER BY n.build_time DESC
            `;
            params = {};
        }


        const result = await Neo4jAsk(query, params)
        console.log("in dataloader, select values:",  result);
        reference_list = result
            .filter(record => check_date(record.get("n"), requestData.startDate, requestData.endDate))
            .map(record => {
            const node = record.get('n');  // 获取节点
            // console.log(node.properties);
            return {
                title: node.properties.name,
                path: node.properties.path,
                "build time": node.properties.build_time
                };
        })
    }
    else{
    if (requestData.searchField === "Tag") {
        query = `
        MATCH (p:Paper)-[:BELONGS_TO]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $tag})
        RETURN DISTINCT p
        ORDER BY p.build_time DESC
        `;
        params = {tag : requestData.searchValue};
    }
    else if (requestData.searchField === "Author") {
        query = `
        MATCH (p:Paper)-[:WRITTEN_BY]->(a:Author)
        WHERE a.name =~ $author
        RETURN DISTINCT p
        ORDER BY p.build_time DESC
        `;
        params = {author : `(?i).*${requestData.searchValue}.*`};
    }
    else if (requestData.searchField == "Title") {
        query = `
        MATCH (p:Paper) WHERE p.title=~$title
        RETURN DISTINCT p
        ORDER BY p.build_time DESC
        `;
        params = {title : `(?i).*${requestData.searchValue}.*`};
    }
    else {
        query = `
        MATCH (p:Paper)
        RETURN p
        ORDER BY p.build_time DESC
        `;
        params = {};
    }

    const result = await Neo4jAsk(query, params)
    reference_list = result
        .filter(record => check_date(record.get("p"), requestData.startDate, requestData.endDate))
        .map(record => {
            const node = record.get('p');  // 获取节点
            const year = typeof(node.properties.year) === "string"
                     ? parseInt(node.properties.year)
                     : node.properties.year.toInt();
            return {
                        title: node.properties.title,
                        year: year,
                        source: node.properties.journal,
                    };
        })
    };
    
    return new Map([
            ['reference_list', reference_list],
            ['BigTag',  selectedValues[0]],
          ]);
    }