// import React, { useState  , useEffect} from 'react';
// // import Menu from "antd/lib/menu";
// import { Menu, Dropdown } from 'antd';
// import { BookOutlined , UserOutlined} from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import getBigTags from "../services/get_big_tags";


// // const BigTags = [
// //   {"Tag":"BigTag1", "index": "1" }, 
// //   {"Tag":"BigTag2", "index": "2" }, 
// //   {"Tag":"BigTag3", "index": "3" }, 
// //   {"Tag":"BigTag4", "index": "4" }, ]



// export default function AppMenu({setContent, setSelectedValues}) { 

//   const [BigTags, setBigTags] = useState([]);

//     useEffect(() => {
//         getBigTags().then(tags => {
//             setBigTags(tags);
//         });
//     }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行一次

//   const handleClick = (tag)=> {
//     // console.log(tag)
//     setContent("All");
//     console.log("from mid menu");
//     setSelectedValues([tag]);
//    }

//   const handleDelete = () => {
//     console.log("Delete operation");
//   };

//   const handleEdit = () => {
//       console.log("Edit operation");
//   };

//    const menu = (
//     <Menu items={[
//         { key: '1', label: '删除' , onClick: handleDelete },
//         { key: '2', label: '修改' , onClick: handleEdit}
//       ]}
//     />
//   );

//   const [visibleMenu, setVisibleMenu] = useState(false);
//   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  
//   const onTagRightClick = (tag, event) => {
//     event.preventDefault(); // 阻止默认的浏览器上下文菜单
//     console.log("Right clicked on:", tag);
//     setVisibleMenu(true);
//     setMenuPosition({ x: event.clientX, y: event.clientY });
// };

    

// return (
//     <Dropdown
//         overlay={menu}
//         trigger={['contextMenu']}
//         visible={visibleMenu}
//         onVisibleChange={setVisibleMenu}
//         overlayStyle={{ position: 'fixed', left: `${menuPosition.x}px`, top: `${menuPosition.y}px` }}
//     >
//         <Menu mode="inline" defaultSelectedKeys={['0']} style={{ height: '100%', borderRight: 0 }}>
//             {BigTags.map((tag, index) => (
//                 <Menu.Item key={index} icon={<BookOutlined />} onContextMenu={(event) => onTagRightClick(tag, event)}>
//                   <Link to={`/Library/Tags/${tag}`}  onClick={() => handleClick(tag)}>
//                   {tag}
//                   </Link>
//                 </Menu.Item>
//             ))}
//         </Menu>
//     </Dropdown>
// );


// }

// import React, { useState, useEffect } from 'react';
// import { Menu, Dropdown, message } from 'antd';
// import { Link } from 'react-router-dom';
// import getBigTags from "../services/get_big_tags";

// export default function AppMenu({ setContent, setSelectedValues }) {
//     const [BigTags, setBigTags] = useState([]);
//     const [visibleMenu, setVisibleMenu] = useState(false);
//     const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
//     const [currentTag, setCurrentTag] = useState(null);



//     useEffect(() => {
//         getBigTags().then(tags => {
//             setBigTags(tags);
//         });
//     }, []);

//     const handleClick = (tag) => {
//         setContent("All");
//         setSelectedValues([tag]);
//     };

//     const handleDelete = () => {
//         console.log('Deleting tag:', currentTag);
//         message.success('Tag deleted');
//         setVisibleMenu(false);
//     };

//     const handleEdit = () => {
//         console.log('Editing tag:', currentTag);
//         message.success('Tag edited');
//         setVisibleMenu(false);
//     };

//     const menu = (
//         <Menu items={[
//             { key: '1', label: '删除', onClick: handleDelete },
//             { key: '2', label: '修改', onClick: handleEdit }
//         ]}
//         />
//     );

//     const onTagRightClick = (tag, event) => {
//         event.preventDefault(); // 阻止默认的浏览器上下文菜单
//         setCurrentTag(tag);
//         setVisibleMenu(true);
//         setMenuPosition({ x: event.clientX, y: event.clientY });
//     };


//     return (
//         <Dropdown
//             overlay={menu}
//             visible={visibleMenu}
//             onVisibleChange={(flag) => setVisibleMenu(flag)}
//             overlayStyle={{ position: 'fixed', left: `${menuPosition.x}px`, top: `${menuPosition.y}px` }}
//         >
//             <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
//                 {BigTags.map((tag, index) => (
//                     <Menu.Item key={index} onContextMenu={(event) => onTagRightClick(tag, event)}>
//                         <Link to={`/Library/Tags/${tag}`} onClick={() => handleClick(tag)}>
//                             {tag}
//                         </Link>
//                     </Menu.Item>
//                 ))}
//             </Menu>
//         </Dropdown>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import getBigTags from "../services/get_big_tags";
import { deleteTag } from '../services/DeleteNode';

export default function AppMenu({ setContent, setSelectedValues }) {
    const [BigTags, setBigTags] = useState([]);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [currentTag, setCurrentTag] = useState(null);

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

    const handleEdit = () => {
        console.log('Editing tag:', currentTag);
        setVisibleMenu(false);
        window.location.reload();
    };

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
    );
}
