

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
    MATCH (n:Note {name: '$notebookname'})
    SET n.name = '$name'
    `

    params.notebookname=notebookname
    const del_paper_res = await Neo4jAsk(dele_note_query, params)
    console.log('modify Notebook:', notebookname)

    return del_paper_res;
}

export  async function modifyTag(tagname,params)
{
    // Arribute: tag_name -> str
    const dele_note_query = `
    MATCH (n:Tag {name: '$tagname'})
    SET n.tag_name = '$tag_name'
    `

    params.tagname=tagname
    const del_paper_res = await Neo4jAsk(dele_note_query, params)
    console.log('modify Tag:', tagname)

    return del_paper_res;
}

export  async function modifyPaper(papername,params)
{
    // Arribute: title->title journal->str year->str
    const dele_note_query = `
    MATCH (n:Paper {name: '$papername'})
    SET n.title = '$title', n.journal = '$journal', n.year = '$year'
    `

    params.papername=papername
    const del_paper_res = await Neo4jAsk(dele_note_query, params)
    console.log('modify Paper:', papername)

    return del_paper_res;
}







