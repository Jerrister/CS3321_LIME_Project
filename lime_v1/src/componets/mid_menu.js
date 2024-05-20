import React, { ffect, useState  , useEffect} from 'react';
import Menu from "antd/lib/menu";
import { BookOutlined , UserOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import getBigTags from "../services/get_big_tags";


// const BigTags = [
//   {"Tag":"BigTag1", "index": "1" }, 
//   {"Tag":"BigTag2", "index": "2" }, 
//   {"Tag":"BigTag3", "index": "3" }, 
//   {"Tag":"BigTag4", "index": "4" }, ]



export default function AppMenu({setContent, setSelectedValues}) { 

  const [BigTags, setBigTags] = useState([]);

    useEffect(() => {
        getBigTags().then(tags => {
            setBigTags(tags);
        });
    }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行一次

  const handleClick = (tag)=> {
    // console.log(tag)
    setContent("All");
    console.log("from mid menu");
    setSelectedValues([tag]);
   }
 
    

    return(
    <Menu
      mode="inline"
      defaultSelectedKeys={['0']}
      style={{ height: '100%', borderRight: 0 }}
    >

        {BigTags.map((tag, index) => (
        <Menu.Item key={index}  icon={<BookOutlined />}> 
          <Link to={`/Library/Tags/${tag}`}  onClick={() => handleClick(tag)}>
            {tag}
          </Link>
        </Menu.Item>
      ))}

    </Menu>
  );

}

