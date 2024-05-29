import React, { useState }  from 'react';
import {  Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { Button, Radio } from 'antd';
import ReferenceTable from './reference_table';
import { Breadcrumb,  theme} from 'antd';
import TagCascader from "./tag_cascader";

import { useLoaderData } from 'react-router';

import { Outlet } from 'react-router';

import LineBarChart from './update_map';


export default function Notebook_VizPage({Content, setContent}) {


  const data =  useLoaderData();

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return (
        <>
        <Breadcrumb style={{ margin: '20px 0' }}>

        <Breadcrumb.Item> Update Log </Breadcrumb.Item>
  


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
      <LineBarChart data={data} />

    </Card>

  </div>

    </>



    )
}