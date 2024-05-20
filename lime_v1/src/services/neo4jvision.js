
// import NeoVis, { NEOVIS_ADVANCED_CONFIG } from 'neovis.js';
import * as NeoVis from "neovis.js"
// import NeoVis from 'neovis.js/dist/neovis.js';
import { useEffect } from "react";



var neoViz;

export default function Neo4jVision() {

  useEffect(() => {
    var config = {
      containerId: 'viz',
      neo4j: {
        serverUrl: 'bolt://localhost:7687',
        serverUser: 'limelime',
        serverPassword: 'limelime'
      },
      visConfig: {
        nodes: {
          size: 10,
          // shape: 'square',
          shape: 'circle',
          // shape: 'dot',
          // shape: 'ellipse',
          // color: 'red',
          font: {   // NEW
            size: 10,
            strokeWidth: 0,   //(to remove the background color inside the box , the white background comes there)
            face: 'times new roman',
            // strokeWeight: 50,
            color: "black",
          },
          widthConstraint: 96,
          shadow: true,
          // widthConstraint: {  //NEW
          //   // minimum: 50
          // },
          heightConstraint: {  //NEW
            // maximum: 100,
            // minimum: 50 (in order to give space between nodes and name)
          },
          mass: 2,  // NEW (in order to stop floating)
          scaling: { //NEW
            // min: 40,
            // max: 60
          },
          // label: {  //NEW
          //   enabled: false
          // } 
        },
        // labelHighlightBold: true, // NEW
        // margin: 2, //NEW
        // layout: {   //NEW (it will bring things into two colums and arrow will point)
        //   hierarchical: {
        //     enabled: true,
        //     direction: "UD",
        //     sortMethod: "directed",
        //   }
        // },
        edges: {
          // hoverWidth: 0,
          selectionWidth: 0,
          //   smooth: {  //New (to point every arrow in one direction)
          //     type: 'continuous',
          //     roundness: 0.15
          // },
          font: {
            size: 9,
            strokeWidth: 0,
            align: 'top'
          },
          arrows: {
            to: { enabled: true, type: 'arrow' }
            // to: { enabled: true, type: 'arrow', scaleFactor: 0.5, color: 'black' } //NEW
          },
          arrowStrikethrough: true, // NEW
          color: { // NEW (in order to change the color of ARROW)
            color: 'black', 
            // opacity: 0.5
          }
        },
      },
      labels: {
        Paper: {
          label: "title",
          [NeoVis.NEOVIS_ADVANCED_CONFIG]: {         
            static: {
              color: "lime",
                    font: {
                      // "background": "none",
                      // "strokeWidth": "0",
                      // "size": 20,
                      "color": "black"
                    }
            }
          }
        },
        Author: {
          label: "name",
        },
        Note: {
          label: "name",
        },
        Tag: {
          label: "tag_name",
        }
        // Character: {
        //   label: 'pagerank',
        //   group: 'community',
        //   [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        //     cypher: {
        //       value: "MATCH (n) WHERE id(n) = $id RETURN n.size"
        //     },
        //     function: {
        //       title: NeoVis.objectToTitleHtml
        //     },
        //   }
        // },
        // Dataset: {
        //   label: "Dataset Name"
        // }
      },
      relationships: {
        [NeoVis.NEOVIS_DEFAULT_CONFIG]:{  // Worked shown all relationships
          [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
            function: {
              label: (rel) => rel.type
            }
          }
        }
    
        // WRITTEN_BY: {  //Worked shown only ACTED_IN relationships
        //   // label: 'type',
        //   // value: 'weight',
        //   [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
        //     static: {
        //       label: "WEITTEN_BY",
        //       color: "red",
        //       font: {
        //         // "background": "none",
        //         // "strokeWidth": "0",
        //         "size": 20,
        //         "color": "green"
        //       }
    
        //     }
        //   }
        // },
        
        // DIRECTED: {
        //   // label: 'type',
        //   value: 'weight',
        //   [NeoVis.NEOVIS_ADVANCED_CONFIG]:{
        //     static: {
        //       label: "ACTED_IN",
        //       color: "red",
    
        //     }
        //   }
        // },
    
        // Serve_as: {
        //   label: "property"
        // },
    
        // INTERACTS: {
        //   value: 'weight',
        //   [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        //     function: {
        //       title: NeoVis.objectToTitleHtml
        //     },
        //   },
        //     // thickness: "weight",
        //     // caption: true
    
        // },
    
        // CONTAINS: {
        //   label: true,
        //   value: 'weight',
        //   [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        //     function: {
        //       title: function (edge) {
        //         console.log(edge);
        //       }
        //     }
        //   }
        // }
    
      //   physics: {
      //     forceAtlas2Based: {
      //         gravitationalConstant: -26,
      //         centralGravity: 0.005,
      //         springLength: 230,
      //         springConstant: 0.18,
      //     },
      //     maxVelocity: 146,
      //     solver: "forceAtlas2Based",
      //     timestep: 0.35,
      //     stabilization: { iterations: 150 },
      // },
    
      },
      // initialCypher: 'MATCH (n)-[r]->(m) RETURN n,r,m'
      // initialCypher: 'MATCH (n) RETURN n LIMIT 20'
      // initialCypher: 'MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies) RETURN tom,tomHanksMovies'
      // initialCypher: 'MATCH (bacon:Person {name:"Kevin Bacon"})-[*1..4]-(hollywood) RETURN DISTINCT hollywood'
      // initialCypher: 'MATCH p=shortestPath((bacon:Person {name:"Kevin Bacon"})-[*]-(meg:Person {name:"Meg Ryan"})) RETURN p'
      // initialCypher: 'MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors), (coActors)-[:ACTED_IN]->(m2)<-[:ACTED_IN]-(cruise:Person {name:"Tom Cruise"}) RETURN tom, m, coActors, m2, cruise'
      // initialCypher: "MATCH (n:Movie) WITH n limit 2 OPTIONAL MATCH (n:Movie{title:'The Matrix'})-[r]-(b) RETURN n,r,b"
      // initialCypher: "MATCH (m:Movie)-[:ACTED_IN]-(a:Actor) RETURN m, a LIMIT 150"
      // initialCypher: 'MATCH (m:Movie) - [:ACTED_IN] - (a:Actor) RETURN m, a'
      // initialCypher: "match (p:Person)-[r]-(o:Movie)-[r1]-(p2:Person) RETURN * LIMIT 10"
      // initialCypher: "MATCH (n: Movie) - [r] - (m) RETURN * LIMIT 10"
      initialCypher: "MATCH p=()-->() RETURN p LIMIT 100"
    };
    
    neoViz = new NeoVis.default(config);

    function draw() {
      
      neoViz.render();
      // console.log("neoViz >> ", neoViz);
      neoViz.registerOnEvent("clickNode", (e) => {
        neoViz.renderWithCypher(`MATCH (p)-[r]-(entity) WHERE id(p) = ${e.node.id} RETURN * `)
        // console.info("Click event ... ", e.node.id);
      });
    }

    draw();
  }, [])

  return (
    <div className="App">
      <div id="viz"       style={{
        width: '900px 0',
        height: '1000px ',
        border: '1px solid lightgray',
        borderRadius: '4px',
        font: '22pt arial'
      }}></div>
    </div>
  );
}
// const requestData = {
//   searchValue: searchValue,
//   searchField: searchField,
//   startDate: selectedDates[0],
//   endDate: selectedDates[1]
// };
export function Neo4jVisionModify(searchField,searchValue) {
  console.log(searchField)
  console.log(searchValue)
  if(searchField=='Title'){
    neoViz.renderWithCypher(`match (p:Paper)-[r]-(entity) WHERE p.title=~'.*${searchValue}.*' RETURN * `)
    // match (p:Paper)-[r*..2]-(entity) WHERE p.title=~'.*Knowledge Distillation*' RETURN * LIMIT 25 
  }
  else if(searchField=='Author'){
    neoViz.renderWithCypher(`match (p:Author)-[r]-(entity) WHERE p.name=~'.*${searchValue}.*' RETURN * `)
  }
  else if(searchField=='Tag'){
    neoViz.renderWithCypher(`match (p:Tag)-[r]-(entity) WHERE p.tag_name=~'.*${searchValue}.*' RETURN * `)
  }
  
}

