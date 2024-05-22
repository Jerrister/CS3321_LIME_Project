import React, { useState, useEffect } from 'react';
import { Cascader, Form } from 'antd';
import GetOptions, { GetCutOptions } from '../services/get_options';
import { useNavigate } from 'react-router-dom';

function findFullPath(options, cutTag, path = []) {
    for (const option of options) {
        const currentPath = [...path, option.value];

        // 检查当前选项是否是 cutTag
        if (option.value === cutTag) {
            // 返回 cutTag 的父路径，不包括 cutTag 本身
            return path;
        }

        // 如果当前选项有子选项，递归查找其中
        if (option.children) {
            const result = findFullPath(option.children, cutTag, currentPath);
            if (result) {
                return result;  // 如果找到，返回结果
            }
        }
    }
    return null;  // 如果没有找到，返回 null
}



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

export function Cut_TagCascader_Form({handleSelectedValues, InselectedValues, CutTag}) {   

    const [options, setOptions] = useState([]);
    const [defaultValue, setDefaultValue] = useState(["All Tags"]);

    // console.log("Inselected value in TagCascader:",InselectedValues);

    useEffect(() => {
        GetOptions(InselectedValues).then(data => {
            const parentValue = findFullPath(data, CutTag); // 这是一个假设的函数，需要您根据实际数据结构实现
            console.log("Parent of ", CutTag, " is ", parentValue, " in ", data);
            setDefaultValue(parentValue);
        }).catch(error => {
            console.error('Failed to fetch options:', error);
            setDefaultValue([]);
        });
        GetCutOptions(InselectedValues, CutTag).then(data => {
            setOptions(data);
        }).catch(error => {
            console.error('Failed to fetch options:', error);
            setOptions([]);
        });
    }, [InselectedValues, CutTag]); 

    useEffect(() => {
        console.log("current default:", defaultValue)
    }, [defaultValue]); 

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
        rules={[{ required: true, message: 'Please select The Parent Tag' }]}
                >
        <Cascader
            key={[defaultValue, InselectedValues]}
            options={options}
            onChange={onChange}
            value={InselectedValues}
            changeOnSelect 
            defaultValue={defaultValue}
            expandTrigger="click"
            placeholder="Please select"
            style={{ width: 'auto' }}
        />
        </Form.Item>
        </div>
    );
}