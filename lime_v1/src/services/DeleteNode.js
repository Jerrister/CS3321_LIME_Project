
import { Neo4jAsk } from '../services/neo4jService';




export  async function deleteRef(paper_title)
{
    const dele_paper_query = `MATCH (n:paper)
    WHERE n.title = $del_title
    DETACH DELETE n
    `
    const del_paper_res = await Neo4jAsk(dele_paper_query, {del_title : paper_title })
    console.log('delete paper:' , paper_title)

    return del_paper_res

}



export  async function deleteNote(note_title)
{
    const dele_note_query = `MATCH (n:Notebook)
    WHERE n.title = $del_title
    DETACH DELETE n
    `
    const del_paper_res = await Neo4jAsk(dele_note_query, {del_title : note_title })
    console.log('delete notebook:' , note_title)

    return del_paper_res
}

export  async function deleteTag(tag_name)
{
    const dele_note_query = `MATCH (n:Tag)
    WHERE n.tag_name = $del_tag_name
    DETACH DELETE n
    `
    const del_paper_res = await Neo4jAsk(dele_note_query, {del_tag_name : tag_name })
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









