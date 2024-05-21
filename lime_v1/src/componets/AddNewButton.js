import { Button , Dropdown, Menu, Modal, Form, Input, Select,Upload, message} from 'antd';
import {   PlusCircleOutlined, UploadOutlined} from '@ant-design/icons';
import React, { useState  , useRef} from 'react';
// ... 其他必要的导入 ...
import ManuallyAddForm , {ManuallyAddNoteForm, CheckpointForm, ManuallyAddTagForm} from './manually_add_form';
import { FolderImporter } from '../services/folderimpoter';
import axios from 'axios';
import { AddPaper } from '../services/neo4jadd';
import { tree } from 'd3';
import DocumentSearch from './ArVixSearch';

export function AddNewButton(flash , setflash) {
  // 用于控制下拉菜单的显示状态
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkFileVisible, setcheckFileVisible] = useState(false);
  
  const [modalNoteVisible, setModalNoteVisible] = useState(false);

  const [modalTagVisible, setModalTagVisible] = useState(false);

  const [ArxivVisible, setArxivVisible] = useState(false);

  const [Filelist, setFilelist] = useState([]);

  // const [FodlerVisible, setModalVisible] = useState(false);

  const fileInputRef = useRef(null);

  const handleMenuClick = (e) => {
    setVisible(false); // 关闭下拉菜单
    if (e.key === '5') {
      // 如果点击的是“Add reference manually”
      setModalVisible(true); // 打开模态对话框
    }
    if(e.key === '4'){
      console.log("Folder!");
      setcheckFileVisible(true);
      fileInputRef.current.click();

      // FolderImporter();
    
    }
    if(e.key === '6'){
      setModalNoteVisible(true);
    }
    if(e.key === '3'){
      setArxivVisible(true);
      // FolderImporter();
    }
    if(e.key === '7'){
      setModalTagVisible(true);
      // FolderImporter();
    }
    // 处理其他菜单项点击事件...
  };

    const handleCancel = () => {
      setModalVisible(false);
    };

    const handlFilesCancel = () => {
      setcheckFileVisible(false);

      setFilelist([]);
    };

    
    const handleNoteCancel = () => {
      setModalNoteVisible(false);
      
    };
  
  
    const handleTagCancel = () => {
      setModalTagVisible(false);
    };
  

    const handleFileChange = async (event) => {

      // setcheckFileVisible(true);
      // console.log("set the files select box visible:" , checkFileVisible)

      const files = event.target.files;
      if (files.length === 0) {
        message.error('No files selected');
        return;
      }
  
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

  
      try {
        const response = await axios.post('http://127.0.0.1:7688/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('Files uploaded successfully');
        console.log('Response:', response.data);
        const result = response.data.result;

        setFilelist(result);
        setflash(!flash);



        // for(let i = 0 ; i < result.length; i ++)
        //   {
        //     const value = {};
        //     const res = result[i];
        //     value["Year"] = 'unknown';
        //     value["Journal"] = 'unknown';
        //     value["Title"] = res["title"];
        //     value["path"] = res["path"];
        //     value["authors"] = res["author"];
        //     AddPaper(value);
        //   }

      }
      catch (error) {
        message.error('Files upload failed');
        console.error('There was an error uploading the files!', error);
      }
    };


    // // 处理显示状态的函数
    const handleVisibleChange = (flag) => {
        setVisible(flag);
        };
    
      const dropdownMenu = (
        <Menu onClick={handleMenuClick}>
          {/* ...其他菜单项 */}
          
          {/* <Menu.Item key="1">Import file(s) from computer</Menu.Item>
          <Menu.Item key="2">Import folder(s) from computer</Menu.Item> */}
    
          {/* <Menu.SubMenu key="3"  title="Import library">
            <Menu.Item key="3-1">BibTeX (*.bib)</Menu.Item>
            <Menu.Item key="3-2">Endnote XML (*.xml)</Menu.Item>
            <Menu.Item key="3-3">RIS (*.ris)</Menu.Item>
            
          </Menu.SubMenu> */}
      
          {/* <Menu.Item key="4">Watch folder...</Menu.Item> */}
          <Menu.Item key="3"> Add  reference from Arxiv </Menu.Item>
          <Menu.Item key="4"> Add  reference from folder </Menu.Item>
          <Menu.Item key="5">Add reference manually</Menu.Item>
          <Menu.Item key="6">Add notebook manually</Menu.Item>
          <Menu.Item key="7">Add Tag manually</Menu.Item>

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

              <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              webkitdirectory="true"
              multiple
              onChange={handleFileChange}
            />

              <ManuallyAddNoteForm visible={modalNoteVisible} handleCancel={handleNoteCancel}  />
  
              <ManuallyAddTagForm visible={modalTagVisible} handleCancel={handleTagCancel}  />

              <DocumentSearch visible={ArxivVisible} setVisible={setArxivVisible}  />
              
              <CheckpointForm visible={checkFileVisible} handleCancel={handlFilesCancel} Filelist={Filelist} handleFilelist={setFilelist}   />
              {/* <AF visible={checkFileVisible} handleCancel={handlFilesCancel} Filelist={Filelist} handleFilelist={setFilelist}/> */}



            </>

      );

} 