import React, { useState } from 'react';
import { Table, Menu, Dropdown, Modal, message , theme} from 'antd';
import NotReference_Page from './not_references';
import ReactDOM from 'react-dom';
import { deleteNote, deleteRef } from '../services/DeleteNode';
import { EditPaperForm, EditNoteForm  } from './EditForm';

// import {}

// TODO 
// 这里根据Content 获取All\ Reference \ Note ;  根据selectedValues 获取对应的tag
export default function ReferenceTable(references, Content,selectedValues ,  flash ,setflash)  {
  
   const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });



    const handleTableChange = (pagination, filters, sorter) => {
        // 当分页、排序、筛选变化时，触发此函数
        setPagination(pagination);
        // 这里你可以添加调用后端接口的逻辑，根据新的分页信息重新获取数据
    };

    console.log("references : ", references);


    let columns = [];
    if (Content === "Notebook")
      {

  
        columns = [
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) =>  a.title.localeCompare(b.title),
            sortDirections: ['descend','ascend'],
          },
    
            {
              title: 'Path',
              dataIndex: 'path',
              key: 'path',
              sorter: (a, b) =>  a.source.localeCompare(b.source),
              sortDirections: ['descend','ascend'],
            },

            {
              title: 'Build Time',
              dataIndex: 'build time',
              key: 'build time',
              sorter: (a, b) =>  a.source.localeCompare(b.source),
              sortDirections: ['descend','ascend'],
            },
  
      // ...其他列的定义
  ];

      }
    else{

      columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) =>  a.title.localeCompare(b.title),
          sortDirections: ['descend','ascend'],
        },
        {
          title: 'Year',
          dataIndex: 'year',
          key: 'year',
          sorter: (a, b) => a.year - b.year,
          sortDirections: ['descend','ascend'],
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            sorter: (a, b) =>  a.source.localeCompare(b.source),
            sortDirections: ['descend','ascend'],
          },
  
          {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
            sorter: (a, b) =>  a.source.localeCompare(b.source),
            sortDirections: ['descend','ascend'],
          },

    // ...其他列的定义
];
      
    }
    
 

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

      
    

      // const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
      const [visibleMenu, setVisibleMenu] = useState(false);
      const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
      const [currentRecord, setCurrentRecord] = useState(null); // 状态来存储当前行的数据
      const [init_document_list , setinit_document_list] = useState([]);

      const [VizPaperEditMenuV, setVizPaperEditMenuV] = useState(false);
      const [VizNoteEditMenuV, setVizNoteEditMenuV] = useState(false); 
    
      const handleDelete = async () => {
        // 在这里实现删除逻辑，例如调用API或更新状态
        console.log('Deleting record', currentRecord); // 打印或处理当前行数据

        if(Content === 'Notebook')
          {
            await deleteNote(currentRecord['title']);
            console.log("DONE Note Delete:", currentRecord['title']);    
            
          }
        else
        {
          await deleteRef(currentRecord['title']);
          console.log("DONE Paper Delete:", currentRecord['title']);
 
        }

        // console.log("FL:", falsh);
        // toggleFlash() ;
        setflash(!flash);

        // console.log("After FL:", falsh);  

 
        message.success('记录已删除'); // 可以展示一个消息确认删除


        setVisibleMenu(false); // 关闭菜单
        // 此处应更新引用数据，从references数组中移除已删除项
      };

      const VizEditMenu = () => {
        console.log("In Edit Viz: " , Content);

        if(Content === "Paper")
          {
            setVizPaperEditMenuV(true);
            setinit_document_list(currentRecord)
    
            setVisibleMenu(false);
            
          }
          else
          {
            setVizNoteEditMenuV(true);
            setinit_document_list(currentRecord)
    
            setVisibleMenu(false);
            
          }
        // console.log("init record in EditMenu:" , currentRecord);

        // console.log("Vis Menu in EditMenu:" , visibleMenu);

        
      }
    


      const handleCancel_EditMenu = () => {
        setVizPaperEditMenuV(false);
        setflash(!flash);
      }

      const handleCancel_NoteEditMenu = () => {
        setVizNoteEditMenuV(false);
        setflash(!flash);
      }

      const menu = (
        <Menu items={[
            { key: '1', label: '删除' , onClick: handleDelete },
            { key: '2', label: '修改' , onClick: VizEditMenu }
          ]}
        />
      );
    
      const onRow = (record, rowIndex) => {
        return {
          onContextMenu: event => {
            event.preventDefault(); // 阻止默认的浏览器上下文菜单
            setCurrentRecord(record); // 存储当前行的数据
            setVisibleMenu(true);
            setMenuPosition({ x: event.clientX, y: event.clientY });
          }
        };
      };

      const handleVisibleChange = (flag) => {
        setVisibleMenu(flag);
      };




  return (

    <>
      <Dropdown
        overlay={menu}
        trigger={['contextMenu']}
        visible={visibleMenu}
        onVisibleChange={handleVisibleChange}
        overlayStyle={{ position: 'fixed', left: `${menuPosition.x}px`, top: `${menuPosition.y}px` }}
      >
      <div />
    </Dropdown>
    <Table
      columns={columns}
      dataSource={references}
      onChange={onChange}
      pagination = {2}
      onRow={onRow}
 
    />

    <EditPaperForm visible={VizPaperEditMenuV}   handleCancel={handleCancel_EditMenu} initValue={init_document_list} />
    <EditNoteForm visible={VizNoteEditMenuV}   handleCancel={handleCancel_NoteEditMenu} initValue={init_document_list}/>
    </>

  );
};
