import React, { useState } from 'react';
import { Table } from 'antd';
import NotReference_Page from './not_references';

// TODO 
// 这里根据Content 获取All\ Reference \ Note ;  根据selectedValues 获取对应的tag
export default function ReferenceTable(references, Content,selectedValues)  {
  
   const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const handleTableChange = (pagination, filters, sorter) => {
        // 当分页、排序、筛选变化时，触发此函数
        setPagination(pagination);
        // 这里你可以添加调用后端接口的逻辑，根据新的分页信息重新获取数据
    };

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) =>  a.title.localeCompare(b.title),
          sortDirections: ['descend','ascend'],
        },
        // {
        //   title: 'Authors',
        //   dataIndex: 'authors',
        //   key: 'authors',
        //   sorter: (a,b) => a.authors.localeCompare(b.authors),

        // //   sorter: (a, b) => a.authors.localeCompare(b.authors),
        //   sortDirections: ['descend','ascend'],
        // },
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
          // {
          //   title: 'File',
          //   dataIndex: 'file',
          //   key: 'file',
          //   sorter: (a, b) => a.file.localeCompare(b.file),
          //   sortDirections: ['descend','ascend'],
          // },
    // ...其他列的定义
];

 

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  if (references.length === 0) {
    return (<NotReference_Page />);
  }

  return (
    <Table
      columns={columns}
      dataSource={references}
      onChange={onChange}
      pagination = {2}
 
    />

  );
};
