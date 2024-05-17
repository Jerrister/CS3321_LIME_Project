import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';

const DemoColumnChart = () => {
  // 假设这是从后端获取的数据
  const [data, setData] = useState([
    { date: '2024-03-01', count: 30 },
    { date: '2024-03-02', count: 40 },
    { date: '2024-03-03', count: 35 },
    // ...更多数据
  ]);

  // 您可以在这里使用useEffect来从后端获取数据
  useEffect(() => {
    // fetchData()...
  }, []);

  const config = {
    data,
    xField: 'date',
    yField: 'count',
    label: {
      // 可配置属性
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: {
        alias: 'Date',
      },
      count: {
        alias: 'Document Count',
      },
    },
  };

  return <Column {...config} />;
};

export default DemoColumnChart;
