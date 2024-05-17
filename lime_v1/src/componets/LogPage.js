import LogMenu from './log_memu';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;


export default function LogPage({setVizContent}){
    const {
        token: { colorBgContainer},
      } = theme.useToken();

    return(
        <>
        <Sider width={200} style={{ background: '#fff' }}>
        <div style={{ padding: '10px', borderBottom: '1px solid #e8e8e8' }}>
        
        {/* <AddNewButton /> */}
        </div>
        <LogMenu  setVizContent={setVizContent} />

        </Sider>

        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>

        <Outlet />

        </Content>
        
        </>
    );
}