

import React, { useState } from 'react';
// import './index.css';
import { 
  AppstoreOutlined, 
  ContainerOutlined, 
  DesktopOutlined, 
  MailOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  PieChartOutlined 
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

export default function SideBar(){
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
      };

      const items = [
        {
          key: '1',
          icon: <PieChartOutlined />,
          label: 'Option 1',
        },
        {
          key: '2',
          icon: <DesktopOutlined />,
          label: 'Option 2',
        },
        {
          key: '3',
          icon: <ContainerOutlined />,
          label: 'Option 3',
        },
        {
          key: '4',
          icon: <MailOutlined />,
          label: 'Option 4',
        },
        {
          key: '5',
          icon: <AppstoreOutlined />,
          label: 'Option 5',
        },
      ];
   
        return (
            <div style={{ width: 256 }}>
              <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
              />
            </div>
          );
    
}



