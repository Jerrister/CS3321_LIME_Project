import React, { useState, useEffect } from 'react';
import { Cascader, Dropdown, Menu, message } from 'antd';
import GetOptions from '../services/get_options';
import { useNavigate } from 'react-router-dom';
import { deleteTag } from '../services/DeleteNode';
import { EditTagForm } from './EditForm';

export default function TagCascader({handleSelectedValues, InselectedValues}) {
    const navigate = useNavigate(); // 初始化 navigate 函数
    const [options, setOptions] = useState([]);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [currentTag, setCurrentTag] = useState(null);
    const [VizTagEditMenuV, setVizTagEditMenuV] = useState(false);
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
        const path = selectedOptions.map(option => option.value).join('-');
        // console.log("Navigating to: /Tags/" + path);
        navigate(`/Library/Tags/${path}`); // 使用 navigate 函数跳转到新路径
    };
    
    const handleMenuClick = async (e) => {
        if (e.key === 'delete') {
            console.log('Deleting tag:', currentTag);
            await deleteTag(currentTag)
            window.location.reload();
        } else if (e.key === 'edit') {
            console.log('Editing tag:', currentTag);
            setVisibleMenu(false);
            setVizTagEditMenuV(true);
        }
        setVisibleMenu(false);
    };

    const onRightClick = (event) => {
        event.preventDefault();
        setVisibleMenu(true);
        console.log("right click", InselectedValues[InselectedValues.length - 1]);
        setCurrentTag(InselectedValues[InselectedValues.length - 1]); 
        // setCurrentTag(selectedOptions[selectedOptions.length - 1]); 
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="delete">删除当前选中标签</Menu.Item>
            <Menu.Item key="edit">修改当前选中标签</Menu.Item>
        </Menu>
    );
    
    const handleCancel_EditMenu = () => {
        setVizTagEditMenuV(false);
        // setflash(!flash);
      }

    return (
        <>
        <Dropdown overlay={menu} visible={visibleMenu} onVisibleChange={setVisibleMenu} trigger={['contextMenu']}>
            <div style={{ width: "656px" }}>
                <Cascader
                    options={options}
                    onChange={onChange}
                    value={InselectedValues}
                    defaultValue={InselectedValues[0]}
                    changeOnSelect 
                    expandTrigger="click"
                    placeholder="Please select"
                    onContextMenu={onRightClick}
                    style={{ width: 'auto' }}
                />
            </div>
        </Dropdown>
        <EditTagForm visible={VizTagEditMenuV}   handleCancel={handleCancel_EditMenu} curtag={currentTag}/>
        </>
    );
}
