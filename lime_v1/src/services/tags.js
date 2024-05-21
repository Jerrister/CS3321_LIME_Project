import {Form, useLoaderData} from "react-router-dom";
import { Neo4jAsk } from "./neo4jService";


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
            `;
        const result = await Neo4jAsk(query, {tag : cur_tag})
        console.log("in dataloader, select values:",  result);
        reference_list = result.map(record => {
            const node = record.get('p');  // 获取节点
            // console.log(node.properties);
            if (typeof(node.properties.year) == "string") {
                return {
                    title: node.properties.title,
                    year: parseInt(node.properties.year),
                    source: node.properties.journal,
                    path: node.properties.path,
                    };
                    }
                    else {
                    return {
                    title: node.properties.title,
                    year: node.properties.year.toInt(),
                    source: node.properties.journal,
                    };
                    }
        })
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
        if (requestData.searchField === "undefined") {
            query = `
            MATCH (n:Note)
            RETURN n
            `;
            params = {};
        }
        else if (requestData.searchField === "Tag") {
            query = `
            MATCH (n:Note)-[:BELONGS_TO]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $tag})
            RETURN DISTINCT n
            `;
            params = {tag : requestData.searchValue};
        }
        else if (requestData.searchField == "Title") {
            query = `
            MATCH (n:Note) WHERE n.name=~$name
            RETURN DISTINCT n
            `;
            params = {name : `(?i).*${requestData.searchValue}.*`};
        }


        const result = await Neo4jAsk(query, params)
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
    else{
    if (requestData.searchField === "undefined") {
        query = `
        MATCH (p:Paper)
        RETURN p
        `;
        params = {};
    }
    else if (requestData.searchField === "Tag") {
        query = `
        MATCH (p:Paper)-[:BELONGS_TO]->(parent:Tag)-[:IN*0..]->(root:Tag {tag_name: $tag})
        RETURN DISTINCT p
        `;
        params = {tag : requestData.searchValue};
    }
    else if (requestData.searchField === "Author") {
        query = `
        MATCH (p:Paper)-[:WRITTEN_BY]->(a:Author)
        WHERE a.name =~ $author
        RETURN DISTINCT p
        `;
        params = {author : `(?i).*${requestData.searchValue}.*`};
    }
    else if (requestData.searchField == "Title") {
        query = `
        MATCH (p:Paper) WHERE p.title=~$title
        RETURN DISTINCT p
        `;
        params = {title : `(?i).*${requestData.searchValue}.*`};
    }

    const result = await Neo4jAsk(query, params)
    reference_list = result.map(record => {
            const node = record.get('p');  // 获取节点
            // console.log(node.properties);
            if (typeof(node.properties.year) == "string") {
                return {
                    title: node.properties.title,
                    year: parseInt(node.properties.year),
                    source: node.properties.journal,
                };
            }
            else {
                return {
                    title: node.properties.title,
                    year: node.properties.year.toInt(),
                    source: node.properties.journal,
                };
            }
        })
    };
    
    return new Map([
            ['reference_list', reference_list],
            ['BigTag',  selectedValues[0]],
          ]);
    }