

import { Neo4jAsk } from '../services/neo4jService';


export  async function modifyAuthor(authorname,params)
{
    // Arribute: name -> str
    const dele_note_query = `
    MATCH (n:Author {name: '$author_name'})
    SET n.name = '$name'
    `

    params.authorname = authorname
    const del_paper_res = await Neo4jAsk(dele_note_query, params)
    console.log('modify Author:', authorname)

    return del_paper_res;
}

export  async function modifyNotebook(notebookname,params)
{
    // Arribute: name -> str
    const dele_note_query = `
    MATCH (n:Note {name: $notebookname})
    SET n.name = $name , n.path = $path
    `


    params.notebookname=notebookname
    const del_paper_res = await Neo4jAsk(dele_note_query, params)
    console.log('modify Notebook:', notebookname)

    return del_paper_res;
}

export  async function modifyTag(tagname,params)
{
    // Arribute: tag_name -> str
    const modify_tag_query = `
    MATCH (n:Tag {name: $tagname})
    SET n.tag_name = $tag_name
    `

    params.tagname=tagname
    const mod_tag_res = await Neo4jAsk(modify_tag_query, params)
    console.log('modify Tag:', tagname)

    return mod_tag_res;
}

export  async function modifyPaper(papername,params)
{
    // Arribute: title->title journal->str year->str path -> str
    const dele_note_query = `
    MATCH (n:Paper {title:$papername})
    SET n.title = $title, n.journal = $journal, n.year = toInteger($year) , n.path = $path
    return n
    `
    
    params.papername=papername
    console.log('year:' ,params.year )
    const del_paper_res = await Neo4jAsk(dele_note_query, params)
    console.log('modify Paper:', papername)
    console.log("update :", params)
    // console.log('modify res:' , del_paper_res)

    // return del_paper_res;
}







