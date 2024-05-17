import { Button , Dropdown, Menu, Modal, Form, Input, Select} from 'antd';
import {   PlusCircleOutlined} from '@ant-design/icons';
import React, { useState } from 'react';
// ... 其他必要的导入 ...
import ManuallyAddForm from './manually_add_form';


export function AddNewButton() {
  // 用于控制下拉菜单的显示状态
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const handleMenuClick = (e) => {
    setVisible(false); // 关闭下拉菜单
    if (e.key === '5') {
      // 如果点击的是“Add reference manually”
      setModalVisible(true); // 打开模态对话框
    }
    // 处理其他菜单项点击事件...
  };




    const handleCancel = () => {
      setModalVisible(false);
    };



    // // 处理显示状态的函数
    const handleVisibleChange = (flag) => {
        setVisible(flag);
        };
    
      const dropdownMenu = (
        <Menu onClick={handleMenuClick}>
          {/* ...其他菜单项 */}
          
          <Menu.Item key="1">Import file(s) from computer</Menu.Item>
          <Menu.Item key="2">Import folder(s) from computer</Menu.Item>
    
          {/* <Menu.SubMenu key="3"  title="Import library">
            <Menu.Item key="3-1">BibTeX (*.bib)</Menu.Item>
            <Menu.Item key="3-2">Endnote XML (*.xml)</Menu.Item>
            <Menu.Item key="3-3">RIS (*.ris)</Menu.Item>
            
          </Menu.SubMenu> */}
      
    
          <Menu.Item key="4">Watch folder...</Menu.Item>
          <Menu.Item key="5">Add reference manually</Menu.Item>
        </Menu>
      );

    return   (
      <>
   
        <Dropdown
        overlay={dropdownMenu}
        onVisibleChange={handleVisibleChange}
        visible={visible}
        trigger={['click']} >
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ marginRight: '8px' }} />}
          style={{
            width: '100%',
            marginBottom: '-3px', // 与其他菜单项的距离
            fontSize: '16px', 
            height: "39px",
            // 较大的字体大小
            
          }}
          onClick={() => setVisible(true)}
        >
          Add new
        </Button>

        
        </Dropdown>

              <ManuallyAddForm visible={modalVisible} handleCancel={handleCancel} />
      
            </>

      );

} 