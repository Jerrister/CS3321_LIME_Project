import { useRouteError } from "react-router";

import React from 'react';
import { Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import logo_img from "../assets/img/logo.png";

import { Breadcrumb,  theme} from 'antd';

export default function ErrorPage(){
    const error = useRouteError();

    console.error(error)

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> ERROR Page </Breadcrumb.Item>
    
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
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ height: "200px" }}>
            <img src={logo_img} alt="Logo" style={{ maxHeight: '100%',  padding: '0px 0px 0px 9px' }} />
            </div>
    
           
            <h3>Opps!!!</h3>
            <p  style={{ color: "gray"}}>Sorry, an unexpected error has occurred! </p>
          </div>
        </Card>
    
      </div>
    
        </>
    
    
      );

}