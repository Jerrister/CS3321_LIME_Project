import { Neo4jAsk } from '../services/neo4jService';

export  function AddPaper(values){

    const title = values["Title"];
    const Journal =  values["Journal"] ;
    const Year = values["Year"];
    const authors = values["authors"];
    const path = values["path"];
    const now = new Date();
    const formattedDate = now.toLocaleString();
   
    
    const query = `CREATE (p:Paper { journal: $Journal , title: $title , year: $year , build_time: $build_time , path: $path  })
    RETURN p`;
    const author_query = `MERGE (a:Author {name: $name}) `; 
    const author_paper_query = `MATCH (a:Author {name: $name}), (p:Paper {title: $title}) 
     MERGE (p)-[r:WRITEN_BY]->(a)  return r`
  

    //  `CREATE (p:Paper {journal: $journal, title: $title, year: $year, authors: $authors, tags: $tags}) RETURN p`
    const Paper_result =  Neo4jAsk(query, {Journal: Journal, title: title, year: Year,  build_time: formattedDate , path: path  });

    authors.map(a => {
        Neo4jAsk(author_query, {  name: a  });
        console.log("create author:",  a);
        Neo4jAsk(author_paper_query, {  name: a ,title : title });
        console.log("link author:",  a ,"to paper:" , title);
        return null;
         
      }

      )

    console.log('Success create paper :', values);

}

export  function AddNote(values){

  const title = values["Title"];
  const path = values["path"];
  const now = new Date();
  const formattedDate = now.toLocaleString();

  const query = `CREATE (p:Notebook {  title: $title , build_time: $build_time , path: $path  })
  RETURN p`;

  //  `CREATE (p:Paper {journal: $journal, title: $title, year: $year, authors: $authors, tags: $tags}) RETURN p`
  const Notebook_result =  Neo4jAsk(query, { title: title,  build_time: formattedDate , path: path  });

  console.log('Success create note :', values);

}


export async function AddTag(tag_name, ParentTag)
{
  const tag_query = `MERGE (t:Tag {tag_name: $tag_name})`;

  await Neo4jAsk(tag_query, {tag_name : tag_name ,  }  );
  
  console.log("Create tag:" , tag_name);
  const tag_parent_add_link = `MATCH (t:Tag {tag_name: $tag_name}), (tp:Tag {tag_name: $Ptag_name})
  MERGE (t)-[r:IN]->(tp) return r`
  await Neo4jAsk( tag_parent_add_link , {tag_name: tag_name ,Ptag_name: ParentTag   });

  console.log("link tag:" , tag_name , "  to Parent:" , ParentTag );
}

