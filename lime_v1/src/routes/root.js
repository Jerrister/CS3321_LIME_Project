// import React from "react";
// import "../index.css";
// import SideBar from "../componets/SideBar";
// import  NavigatorBar  from "../componets/NavigatorBar"

import React, { Children, useState } from 'react';
import logo from "../assets/img/logo.png"
import logo_f from '../componets/logo_f';
import { logo_stype } from '../componets/logo_f';
import AppMenu from '../componets/mid_menu';
import { BookOutlined, StarOutlined, UploadOutlined, UserOutlined, TeamOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AddNewButton } from '../componets/AddNewButton';
import WelcomeBlock from '../componets/welcome';
import { Link } from 'react-router-dom';


import {
  DesktopOutlined,
  FileOutlined,
  LineChartOutlined,
  EditOutlined,
  DeleteColumnOutlined,
  DoubleLeftOutlined,
  LikeOutlined,

} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon,children) {
  return {
    key,
    icon,
    label,
    children
  };
}

const MenuItems = [

  getItem('Library', '1', <FileOutlined />),
  getItem('Notebook', '2', <EditOutlined />),
  getItem('Log', 'sub1', <LineChartOutlined />),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];




export default function Root()  {
  const [collapsed, setCollapsed] = useState(false);




  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <div className="logo" style={logo_stype }>
          
          <img src={logo} alt="Logo" style={{ maxHeight: '100%',  padding: '0px 0px 0px 9px' }} />
          {!collapsed && logo_f(collapsed)  }
        
        </div>

        <Menu
      theme='dark'
      mode="inline"
      defaultSelectedKeys={['0']} >

      {MenuItems.map((tag_dict, index) => (
              <Menu.Item key={index}  icon={tag_dict["icon"]}> 
                <Link to={`${tag_dict["label"]}`}  >
                  {tag_dict["label"]}
                </Link>
              </Menu.Item>
            ))}
    
    </Menu>
        
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
        
      </Sider>
      <Layout>

      <Outlet/>

     
      </Layout>
    </Layout>
  );
};


function getContacts()
{
  return (<div></div>);
}




export async function loader() {
    const contacts = await getContacts();
    return {contacts}
}