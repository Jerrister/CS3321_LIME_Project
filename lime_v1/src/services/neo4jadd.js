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
      }
         
      )

    console.log('Success create paper :', values);

}