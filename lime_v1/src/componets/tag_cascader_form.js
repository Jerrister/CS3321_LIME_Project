import React, { useState, useEffect } from 'react';
import { Cascader, Form } from 'antd';
import GetOptions from '../services/get_options';
import { useNavigate } from 'react-router-dom';

export default function TagCascader_Form({handleSelectedValues, InselectedValues}) {
   

    const [options, setOptions] = useState([]);
    // console.log("Inselected value in TagCascader:",InselectedValues);

    useEffect(() => {
        GetOptions(InselectedValues).then(setOptions).catch(error => {
            console.error('Failed to fetch options:', error);
            setOptions([]); // 设置默认或错误状态
        });
    }, [InselectedValues]); // 依赖于 InselectedValues

    const onChange = (value, selectedOptions) => {
        console.log("from tag_cas")
        handleSelectedValues(selectedOptions.map(option => option.value));
        // const path = selectedOptions.map(option => option.value).join('-');
        // console.log("Navigating to: /Tags/" + path);
        // navigate(`/Library/Tags/${path}`); // 使用 navigate 函数跳转到新路径
    };

    // console.log("isv in cas:", InselectedValues);
    // console.log("ops in cas:", options);

    return (
        <div style={{width:"656px"}}>
        <Form.Item 
        label="Select The Parent Tag"
        name="selectedOption"
                >
        <Cascader
            options={options}
            onChange={onChange}
            value={InselectedValues}
            changeOnSelect 
            defaultValue={InselectedValues[0]}
            expandTrigger="click"
            placeholder="Please select"
            style={{ width: 'auto' }}
        />
        </Form.Item>
        </div>
    );
}
