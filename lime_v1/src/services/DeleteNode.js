
import { Neo4jAsk } from '../services/neo4jService';

// var all_tags_id=-1;
async function get_all_tags_id()
{
    const all_tags_id_query = `
            MATCH (tag:Tag {tag_name: 'All Tags'}) return id(tag) as id
        `

        const value = await Neo4jAsk(all_tags_id_query, {});
        const all_tags_id = value
        console.log("all_tags_id:",value, all_tags_id)
    
    return all_tags_id;
}


export  async function deleteRef(paper_title)
{
    const dele_paper_query = `MATCH (n:Paper)
    WHERE n.title = $del_title
    DETACH DELETE n
    `
    const del_paper_res = await Neo4jAsk(dele_paper_query, {del_title : paper_title })
    console.log('delete paper:' , paper_title)

    return del_paper_res

}

export  async function deleteNote(note_title)
{
    const dele_note_query = `MATCH (n:Note)
    WHERE n.name = $del_title
    DETACH DELETE n
    `
    const del_paper_res = await Neo4jAsk(dele_note_query, {del_title : note_title })
    console.log('delete notebook:' , note_title)

    return del_paper_res
}

export  async function deleteTag(tag_name)
{
    const all_tags_id = await get_all_tags_id();

    console.log("ati at delete", all_tags_id[0]["id"]);

    const dele_note_query = `// 1. 找到要删除的Tag及其父节点、子节点、相关的Paper和Notebook
    MATCH (parent:Tag)<-[r2:IN]-(tag:Tag {tag_name: '$del_tag_name'})
    OPTIONAL MATCH (tag)<-[r1:BELONGS_TO]-(p:Paper)
    OPTIONAL MATCH (tag)<-[r1:BELONGS_TO]-(n:Note)
    OPTIONAL MATCH (tag)<-[childRel:IN]-(child:Tag)
    WITH parent, tag, child, p, n, r1, childRel, parent.id AS parentId

    // 2. 在父节点与子节点之间建立新的R2关系（仅在子节点存在时）
    FOREACH (_ IN CASE WHEN child IS NOT NULL THEN [1] ELSE [] END |
        CREATE (parent)<-[:IN]-(child)
    )

    // 如果父节点不是all_tags，在父节点与Paper和Notebook之间建立新的R1关系（仅在Paper或Notebook存在时）
    FOREACH (_ IN CASE WHEN parentId <> $all_tags_id AND p IS NOT NULL THEN [1] ELSE [] END |
        CREATE (parent)<-[:BELONGS_TO]-(p)
    )
    FOREACH (_ IN CASE WHEN parentId <> $all_tags_id AND n IS NOT NULL THEN [1] ELSE [] END |
        CREATE (parent)<-[:BELONGS_TO]-(n)
    )

    // 3. 删除原有关系及Tag节点
    DETACH DELETE tag
    `

    const del_paper_res = await Neo4jAsk(dele_note_query, {del_tag_name : tag_name,all_tags_id:all_tags_id})
    console.log('delete Tag:' , tag_name)

    return del_paper_res

}


export  async function deleteAuthor(author_name)
{
    const dele_note_query = `MATCH (n:Author)
    WHERE n.name = $del_author_name
    DETACH DELETE n
    `
    const del_paper_res = await Neo4jAsk(dele_note_query, {del_author_name : author_name })
    console.log('delete Author:' , author_name)

    return del_paper_res
}









