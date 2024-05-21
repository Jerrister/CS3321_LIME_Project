import { AddNewButton } from '../componets/AddNewButton';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import { useState} from 'react';

import AppMenu from '../componets/mid_menu';

const { Header, Content, Footer, Sider } = Layout;


export default function LibraryPage({setContent,setSelectedValues, flash , setflash })
{
    const {
        token: { colorBgContainer},
      } = theme.useToken();

    // console.log(setSelectedValues)

    return(
        <>
        
        <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ padding: '10px', borderBottom: '1px solid #e8e8e8' }}>
        
        <AddNewButton flash={flash} setflash={setflash} />
        </div>
        <AppMenu setContent={setContent} setSelectedValues={setSelectedValues} />

        </Sider>


        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>

        <Outlet />

        </Content>
        
        </>
    );
}


