import React from 'react';
import { Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import logo_img from "../assets/img/logo.png";

import { Breadcrumb,  theme} from 'antd';


const WelcomeBlock = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
        <Breadcrumb style={{ margin: '16px 0' }}>
    <Breadcrumb.Item> Welcome Page </Breadcrumb.Item>

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
       
        <h3>Welcome to your <spen style={{color: 'rgb(155 236 47)'}}>Lime</spen>  - Literature Note Manager System</h3>
        <p> Some introduction ...</p>
      </div>
    </Card>

  </div>

    </>


  );
};

export default WelcomeBlock;