import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import getBigTags from "../services/get_big_tags";
import { deleteTag } from '../services/DeleteNode';
import { EditTagForm } from './EditForm';

export default function AppMenu({ setContent, setSelectedValues }) {
    const [BigTags, setBigTags] = useState([]);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [currentTag, setCurrentTag] = useState(null);
    const [VizTagEditMenuV, setVizTagEditMenuV] = useState(false);

    useEffect(() => {
        getBigTags().then(tags => {
            setBigTags(tags);
        });
    }, []);

    useEffect(() => {
        const handleBodyClick = (event) => {
            // 检查点击事件的目标是否是菜单或菜单的子元素
            if (visibleMenu && !event.target.closest('.dropdown-menu')) {
                setVisibleMenu(false);
            }
        };

        // 添加事件监听器
        document.body.addEventListener('click', handleBodyClick);

        // 清理函数
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, [visibleMenu]);

    const handleClick = (tag) => {
        setContent("Paper");
        setSelectedValues([tag]);
    };

    const handleDelete = async () => {
        console.log('Deleting tag:', currentTag);
        await deleteTag(currentTag)
        setVisibleMenu(false);
        window.location.reload();
    };

    useEffect(() => {
        if (currentTag && VizTagEditMenuV) {
            console.log('Editing tag:', currentTag);
        }
    }, [currentTag, VizTagEditMenuV]);

    const handleEdit = () => {
        console.log('Editing tag:', currentTag);
        setVisibleMenu(false);
        setVizTagEditMenuV(true);
    };

    const handleCancel_EditMenu = () => {
        setVizTagEditMenuV(false);
        // setflash(!flash);
      }

    const menu = (
        <Menu items={[
            { key: '1', label: '删除', onClick: handleDelete },
            { key: '2', label: '修改', onClick: handleEdit }
        ]}
        />
    );

    const onTagRightClick = (tag, event) => {
        event.preventDefault(); // 阻止默认的浏览器上下文菜单
        setCurrentTag(tag);
        setVisibleMenu(true);
        setMenuPosition({ x: event.clientX, y: event.clientY });
    };

    return (
        <>
        <Dropdown
            overlay={menu}
            visible={visibleMenu}
            trigger={['contextMenu']}
            onVisibleChange={(flag) => setVisibleMenu(flag)}
            overlayStyle={{ position: 'fixed', left: `${menuPosition.x}px`, top: `${menuPosition.y}px` }}
        >
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
                {BigTags.map((tag, index) => (
                    <Menu.Item key={index} onContextMenu={(event) => onTagRightClick(tag, event)}>
                        <Link to={`/Library/Tags/${tag}`} onClick={() => handleClick(tag)}>
                            {tag}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Dropdown>

        <EditTagForm visible={VizTagEditMenuV}   handleCancel={handleCancel_EditMenu} curtag={currentTag}/>

        </>
    );
}
