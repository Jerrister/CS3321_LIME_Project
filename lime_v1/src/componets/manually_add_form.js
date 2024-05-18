import React from 'react';
import { Button, Checkbox, Form, Input , Modal ,Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { Neo4jAsk } from "./neo4jService";
import { Neo4jAsk } from '../services/neo4jService';


const  onFinish = (values) => {

  const title = values["Title"];
  const Journal = values['Journal'];
  const Year = values["Year"];
  const authors = values["authors"];
  const tags = values["tag"];
  const path = values["path"];

  const now = new Date();
  const formattedDate = now.toLocaleString();
  // query =  'CREATE (p:Paper { journal: $title , title: "good", year: 2024})   RETURN p'
  const query = `CREATE (p:Paper { journal: $Journal , title: $title , year: $year , build_time: $build_time , path: $path  })
       RETURN p`;

      //  `CREATE (p:Paper {journal: $journal, title: $title, year: $year, authors: $authors, tags: $tags}) RETURN p`
  const Paper_result =  Neo4jAsk(query, {Journal: Journal, title: title, year: Year,  build_time: formattedDate , path: path  });

  const tag_query = `MERGE (t:Tag {tag_name: $tag_name})`;
  const tag_paper_link = `MATCH (t:Tag {tag_name: $tag_name}), (p:Paper {title: $title})
  MERGE (p)-[r:BELONGS_TO]->(t) return r`
  console.log("Paper:" , Paper_result);

  const author_query = `MERGE (a:Author {name: $name}) `; 
  const author_paper_query = `MATCH (a:Author {name: $name}), (p:Paper {title: $title}) 
   MERGE (p)-[r:WRITEN_BY]->(a)  return r`


  tags.map(element => {
    console.log("create tag:",  element);
    Neo4jAsk(tag_query, {tag_name: element  });
    console.log("link tag:", element, " to paper:" , title);
    Neo4jAsk(tag_paper_link , {tag_name: element , title: title });
  
    // console.log(element); // 执行某些操作
    return element; // 即使你不使用返回的数组，也需要返回值
});

  authors.map(a => {
    Neo4jAsk(author_query, {  name: a  });
    console.log("create author:",  a);
    Neo4jAsk(author_paper_query, {  name: a ,title : title });
    console.log("link author:",  a ,"to paper:" , title);
  }
     
  )


  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


export default function ManuallyAddForm({visible , handleCancel}) {
    return (
        <Modal
        title="Add reference manually"
        visible={visible}
        onCancel={handleCancel}
        footer={null}

      >
        <Form
        name="basic"
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="Title"
          rules={[{ required: true, message: 'Please input the title of reference' }]}
        >
          <Input />
        </Form.Item>
    
        {/* <Form.Item
          label="Authors"
          name="Author1"
          rules={[{ required: false}]}
        >

          <Input.Password />
        </Form.Item> */}

         {/* <div style={{margin: "-15px 0 8px 9px"}}>  Author(s)</div> */}
    
        <Form.List
        name="authors"
        label="Author(s)"
        initialValue={['']} // 初始化时有一个作者输入
        style = {{margin: "-15px 0 0 8px"}}
        
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...field}
                key={field.key}
                label={index === 0 ? "Authors" : ""} // 只在第一个作者输入处显示标签
                validateTrigger={['onChange', 'onBlur']}
                rules={[{ required: true, message: 'Please input the title of reference' }]}
                style={{    margin: "0 0 10px 0"}}
              >
               
                  <Input
                    placeholder="Please enter author names 'last name, first name' (e.g. 'Smith, Jane')"
                    suffix={
                        fields.length > 1 ? ( 
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                          style={{ color: 'rgba(0,0,0,.45)', margin: '0 8px' }}
                      />) : null
                    }
                  />
                </Form.Item>
         
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add another author
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
          label="Journal"
          name="Journal"
          style={{margin: "-15px 0 0px 0px"}} 
          rules={[{ required: true, message: 'Please input the title of reference' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Year"
          name="Year"
          rules={[{ required: true, message: 'Please input the title of reference' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Path"
          name="Path"
          rules={[{ required: true, message: 'Please input the local path of reference' }]}
        >
          <Input />
        </Form.Item>


        <Form.List
        name="tag"
        label="Tag(s)"
        initialValue={['']} // 初始化时有一个作者输入
        style = {{margin: "-15px 0 0 8px"}}
        
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...field}
                key={field.key}
                label={index === 0 ? "Tag" : ""} // 只在第一个作者输入处显示标签
                validateTrigger={['onChange', 'onBlur']}
                rules={[{ required: true, message: 'Please input the Tag' }]}
                style={{    margin: "0 0 10px 0"}}
              >
               
                  <Input
                    placeholder="Please enter Tag "
                    suffix={
                        fields.length > 1 ? ( 
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                          style={{ color: 'rgba(0,0,0,.45)', margin: '0 8px' }}
                      />) : null
                    }
                  />
                </Form.Item>
         
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add another Tag
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>


    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleCancel}>
            Submit
          </Button>

          <Space /> <Space /><Space />   <Space /> <Space /><Space />

          <Button type="primary"  onClick={handleCancel} style={{margin :" 0px 0 0 25px"}}>
            Cancel
          </Button>
        </Form.Item>


      </Form>
      </Modal>
    )
}