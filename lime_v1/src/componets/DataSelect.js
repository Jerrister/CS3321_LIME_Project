import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const DataSelecter = () => (
  <Space direction="vertical" size={12}>
    <RangePicker  style={{margin: "7px 0px 0px 0px"}}/>

  </Space>
);
export default DataSelecter;