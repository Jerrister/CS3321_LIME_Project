import React, { useState }  from 'react';
import {  Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { Button, Radio } from 'antd';
import ReferenceTable from './reference_table';
import { Breadcrumb,  theme} from 'antd';
import TagCascader from "./tag_cascader";

import { useLoaderData } from 'react-router';
import Title_form from './Title_Form';



export default function AllSrcPage({Content, selectedValues,setContent, setSelectedValues}) {

  console.log("AllSrcPage Called!")

   const DataMap =  useLoaderData(Content, selectedValues);
   const reference_list = DataMap.get("reference_list")
  

  //  console.log(reference_list);
  //  console.log(Content);
    
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    // const [Content, setContent] = useState("All");

    // const [selectedValues, setSelectedValues] = useState(BigTag);


   console.log(selectedValues);

    return (
        <>
        <Breadcrumb style={{ margin: '20px 0' }}>

        

        <div style={{ display: 'flex', alignItems: 'center'}}> {/* 使用 Flex 布局 */}



      <Title_form  selectedValues={selectedValues} setSelectedValues={setSelectedValues} />

      <div style={{ flex: 1, textAlign: 'right' }}> {/* 使用 Flex 布局，占据剩余空间并右对齐 */}

   

      <Row justify="end"  style={{padding: '0 0 0 14px' , width:"328px" }} >
        <Col>
   
        <Radio.Group value={Content} onChange={e => setContent(e.target.value)} type="primary"  style={{ marginRight: '8px' }}>
        <Radio.Button value="All">All</Radio.Button>
        <Radio.Button value="Reference">Reference</Radio.Button>
        <Radio.Button value="Notebook">Notebook</Radio.Button>

      </Radio.Group>
      </Col>
      </Row>
      </div>
  
    
    
    </div> 

   


  </Breadcrumb>
  <div
    style={{
      padding: 24,
      minHeight: 360,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }}
  >
  
  <Card
      style={{
        margin: '16px 0',
        border: '1px dashed #91d5ff',
        borderRadius: '4px',

      }}
    >
        {ReferenceTable(reference_list,Content,selectedValues)}
        
        {/* <ReferenceTable reference_list={reference_list} /> */}
        
    </Card>

  </div>

    </>



    )
}