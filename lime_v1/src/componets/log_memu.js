import Menu from "antd/lib/menu";
import { BookOutlined , UserOutlined, ApartmentOutlined , TagsOutlined , EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import getBigTags from "../services/get_big_tags";


export default function LogMenu({setVizContent})
{
    const handleClick = (value)=> {
        // console.log(tag)
        setVizContent(value);
       }
     
        
        return(
        <Menu
          mode="inline"
          defaultSelectedKeys={['0']}
          style={{ height: '100%', borderRight: 0 }}
        >
    
          
            <Menu.Item key="4"  icon={<BookOutlined />}> 
              <Link to={`/Log/notebook_log`}  onClick={() => handleClick()}>
                Notebook Log
              </Link>
            </Menu.Item>

            <Menu.Item key="3"  icon={<EditOutlined />}> 
              <Link to={`/Log/literature_log`}  onClick={() => handleClick()}>
                Literature Log
              </Link>
            </Menu.Item>
          
            <Menu.Item key="1"  icon={<TagsOutlined />}> 
              <Link to={`/Log/bubble_chart`}  onClick={() => handleClick()}>
                Tag Log
              </Link>
            </Menu.Item>     

            <Menu.Item key="2"  icon={<ApartmentOutlined />}> 
              <Link to={`/Log/neo4jvision`}  onClick={() => handleClick()}>
               Thesis Note Graph
              </Link>
            </Menu.Item>
        
        </Menu>
      );
}