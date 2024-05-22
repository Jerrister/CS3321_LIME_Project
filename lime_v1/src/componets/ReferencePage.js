import React, { useState, useEffect }  from 'react';
import {  Row, Col, Card } from 'antd';

import {Radio } from 'antd';
import ReferenceTable from './reference_table';
import { Breadcrumb,  theme} from 'antd';

import Title_form from './Title_Form';

import {loader as tagDataLoader } from "../services/tags";


export default function AllSrcPage({Content, selectedValues,setContent, setSelectedValues , flash , setflash, VizLLM, setVizLLM }) {

    console.log("AllSrcPage Called!")

       
   useEffect(() => {
    console.log('VizLLM Update');
  
  }, [VizLLM]);

    console.log("Content:", Content, "sV:", selectedValues)

    const [refData, setRefData] = useState(new Map([
      ['reference_list', []]
    ]));



    console.log("before useEffect ref data:", refData);

    useEffect(() => {
      console.log('Component mounted or updated');
      console.log('refData in useEffect:', refData);
    }, [refData]);
  


    // console.log("Inselected value in TagCascader:",InselectedValues);

    console.log("before ref data:", refData);

    useEffect(() => {
       console.log('Component mounted or updated');
       console.log('refData in useEffect:', refData);
    }, [refData]);

    // const reference_list = refData.get("reference_list") || []
    useEffect(() => {
      console.log("Before Loader, selectedValues :", selectedValues)
        tagDataLoader(selectedValues,Content).then(setRefData).catch(error => {
            console.error('Failed to fetch options:', error);
            setRefData(new Map([
              ['reference_list', []]
            ])); // 设置默认或错误状态
        });
        console.log("after load refdata:", refData );
        console.log("in loading, selectedValues:",  selectedValues);
    }, [selectedValues, Content, flash]);

    console.log("ref data:", refData);

    // const [currentData, setCurrentData] = useState(data);
    // useEffect(() => {
    //     setCurrentData(data);  // 更新状态以触发重新渲染
    // }, [data]);

   const reference_list = refData.get("reference_list") || []

   console.log("page r_l:", reference_list);
  
  //  console.log(reference_list);
  //  console.log(Content);
    
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    // const [Content, setContent] = useState("All");

    // const [selectedValues, setSelectedValues] = useState(BigTag);


    console.log("select Values: ",selectedValues);

    return (
        <>
        <Breadcrumb style={{ margin: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center'}}> {/* 使用 Flex 布局 */}
        <Title_form  selectedValues={selectedValues} setSelectedValues={setSelectedValues} />

      <div style={{ flex: 1, textAlign: 'right' }}> {/* 使用 Flex 布局，占据剩余空间并右对齐 */}

      <Row justify="end"  style={{padding: '0 0 0 14px' , width:"278px" }} >
        <Col>
   
        <Radio.Group value={Content} onChange={e => setContent(e.target.value)} type="primary"  style={{ marginRight: '8px' }}>
        {/* <Radio.Button value="All">All</Radio.Button> */}
        <Radio.Button value="Paper" >Paper</Radio.Button>
        <Radio.Button value="Notebook" >Notebook</Radio.Button>

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
        {ReferenceTable(reference_list,Content,selectedValues, flash,  setflash, VizLLM, setVizLLM)}
        
        {/* <ReferenceTable reference_list={reference_list} /> */}
        
    </Card>

  </div>

    </>

    )
}