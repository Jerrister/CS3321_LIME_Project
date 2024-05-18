import logo from './logo.svg';

import './App.css';
import Root from './routes/root';
import ErrorPage from './routes/error_page';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contact from './routes/contact';
import WelcomeBlock from './componets/welcome';
import AllSrcPage from './componets/ReferencePage';
import LibraryPage from './componets/LibraryPage';
import {loader as tagDataLoader } from "./services/tags";
import { useState } from 'react';
import LogPage from './componets/LogPage';
import Bubble_VizPage from './componets/Bubble_VizPage';
import Notebook_VizPage from './componets/Notebook_VizPage';
import Literature_VizPage from './componets/Literature_VizPage';
import {loader as NoteLogLoader } from "./services/notelog";
import {loader as LiteratureLogLoader } from "./services/literaturelog";
import {loader as TagLogLoader } from "./services/taglog";


import { sampleData } from './componets/bubble_map';
import { Navigate } from 'react-router-dom';
import Neo4_VizPage from './componets/Neo4_VisPage';

function App() {
  
  const [Content, setContent] = useState("All");

  const [selectedValues, setSelectedValues] = useState(["All Tags"]);

  // const [selectedBigValues, setSelectedBigValues] = useState(["All Tags"]);

  const [VizContent, setVizContent] =  useState("Update Log");

  const router = createBrowserRouter([
    {
      path:"/",
      element: <><Root/>  </>  ,

      children : [
  
        {
          path:"Library",
          element: <LibraryPage setContent={setContent} setSelectedValues={setSelectedValues}   />,
          errorElement: <ErrorPage/>,
          // index: true,
          children:[
            {
              path: "Tags/:tagsid",
              element: <AllSrcPage Content={Content} selectedValues={selectedValues} setContent={setContent} setSelectedValues={setSelectedValues}  />,
              loader: tagDataLoader ,
            },
            {
              element: <WelcomeBlock />,
              index: true
            }

          ]
        },
        {
          path:"Log",
          element: <LogPage setVizContent={setVizContent}  />,
          errorElement:<ErrorPage/>,
          children: [
            {
              path: "notebook_log",
              element: < Notebook_VizPage VizContent={VizContent}   />,
              loader: NoteLogLoader ,
              // element: <BubbleChart data={sampleData} width={100} height={100} />,
    
              // loader: logDataLoader ,
            },

            {
              path: "literature_log",
              element: <Literature_VizPage VizContent={VizContent}   />,
              loader: LiteratureLogLoader ,
              // element: <BubbleChart data={sampleData} width={100} height={100} />,
    
              // loader: logDataLoader ,
            },
            {
              path: "bubble_chart",
              
            element: <Bubble_VizPage VizContent={VizContent}   />,
            loader: TagLogLoader ,
            },
            {
              path: "neo4jvision",
              
            element: <Neo4_VizPage  VizContent={VizContent}/>,
          
            },

            {
              element: <WelcomeBlock />,
              index: true
            }

          ]
        
        }
      ],
    },
  ]
  )
  
  return (
    <>
         <RouterProvider router={router} />
    </>
    
 
    
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
