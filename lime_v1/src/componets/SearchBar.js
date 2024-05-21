import React , { useState } from 'react';
import {Neo4jVisionModify} from '../services/neo4jvision';
import { useNavigate } from 'react-router-dom';
import { Input, DatePicker, Space, Select } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;



const SearchBar = ({ InPage }) => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);
    const [searchField, setSearchField] = useState(''); // 保存选中的搜索域
  
    const handleSearch = () => {
      // 构建请求数据对象
      const requestData = {
        searchValue: searchValue,
        searchField: searchField,
        startDate: selectedDates[0],
        endDate: selectedDates[1]
      };

      console.log(InPage);
      console.log(requestData);
      // console.log(searchValue)
      // console.log(searchField)
      if(InPage=='Neo4j'){
        Neo4jVisionModify(searchField,searchValue)
      }
      if(InPage=='TagPage'){
        navigate(`/Library/Search/f:${requestData.searchField}-s:${requestData.searchValue}-sd:${requestData.startDate}-ed:${requestData.endDate}`); // 使用 navigate 函数跳转到新路径
      }
    };
  
    return (
      <div>
        <Space direction="vertical" size={12}>
          <RangePicker
            style={{ margin: "0px 5px 0px 5px" , padding: "5px 10px 5px 10px" }}
            onChange={(dates, dateStrings) => setSelectedDates(dates)}
          />
        </Space>

        <Space direction="horizontal"   style={{columnGap: '1px'}} >
       
          <Select 
            value={searchField}
            style={{ width: 90 }}
            onChange={value => setSearchField(value)}
          >
            <Option value="Title">Title</Option>
            <Option value="Author">Author</Option>
            <Option value="Tag"> Tag </Option>
            {/* 其他搜索域选项 */}
          </Select>
          <Input.Search
            placeholder={`请输入${searchField}的搜索内容`}
            onSearch={handleSearch}
            enterButton
            onChange={e => setSearchValue(e.target.value)}
          />
        </Space>

      </div>
        
    );
  };


export default SearchBar;
