import React, { useState, useEffect }  from 'react';
import {  Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import { Button, Radio } from 'antd';
import ReferenceTable from './reference_table';
import { Breadcrumb,  theme} from 'antd';
import TagCascader from "./tag_cascader";

import { useLoaderData } from 'react-router';
import Title_form from './Title_Form';
import { searcher as tagSearcher} from "../services/tags";
import { map } from 'd3';

function useRequestDataFromPath() {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean); // 移除空字符串

    // 提取Search后面的部分
    const paramsSegment = pathSegments[2]; // 获取包含参数的部分
    const params = paramsSegment.split('-'); // 分割不同的参数
    const requestData = {};
    params.forEach(param => {
          const [key, value] = param.split(':');
          if (key && value) {
          // 根据key设置相应的requestData属性
              switch (key) {
                  case 'f':
                      requestData.searchField = value;
                      break;
                  case 's':
                      requestData.searchValue = value;
                      break;
                  case 'sd':
                      requestData.startDate = value;
                      break;
                  case 'ed':
                      requestData.endDate = value;
                      break;
                  default:
                      break;
              }
          }
    });

    return requestData;
}

export default function SearchPage({Content, selectedValues,setContent, setSelectedValues}) {

    console.log("SearchPage Called!")

    const requestData = useRequestDataFromPath();

    console.log("Search Request:", requestData);
    console.log("Content:" , Content);
    console.log("Content Bool:" , Content === "Paper");

    const [refData, setRefData] = useState(new Map([
      ['reference_list', []]
    ]));
    // console.log("Inselected value in TagCascader:",InselectedValues);

    useEffect(() => {
      console.log("searcher called!")
        tagSearcher(selectedValues, Content, requestData).then(setRefData).catch(error => {
            console.error('Failed to fetch options:', error);
            setRefData(new Map([
              ['reference_list', []]
            ])); // 设置默认或错误状态
        });
    }, [selectedValues, Content]);

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
        {/* <Radio.Button value="All">All</Radio.Button> */}
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