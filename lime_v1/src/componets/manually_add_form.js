import React, {useEffect, useState, useReducer} from 'react';
import { Button, Checkbox, Form, Input , Modal ,Space, List, Spin} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { Neo4jAsk } from "./neo4jService";
import { Neo4jAsk } from '../services/neo4jService';
import { AddPaper } from '../services/neo4jadd';
// import TagCascader_F from './tag_cascader';
import AllSrcPage from './ReferencePage';
import TagCascader_Form from './tag_cascader_form';


const  onFinish = async (values) => {

  const title = values["Title"];
  const Journal = values['Journal'];
  const Year = values["Year"];
  const authors = values["authors"];
  const tags = values["tag"];
  const path = values["Path"];

  const now = new Date();
  const formattedDate = now.toLocaleString();
  // query =  'CREATE (p:Paper { journal: $title , title: "good", year: 2024})   RETURN p'
  const query = `CREATE (p:Paper { journal: $Journal , title: $title , year: $year , build_time: $build_time , path: $path  })
       RETURN p`;

      //  `CREATE (p:Paper {journal: $journal, title: $title, year: $year, authors: $authors, tags: $tags}) RETURN p`
  const Paper_result = await Neo4jAsk(query, {Journal: Journal, title: title, year: Year,  build_time: formattedDate , path: path  });

  const tag_query = `MERGE (t:Tag {tag_name: $tag_name})`;
  const tag_paper_link = `MATCH (t:Tag {tag_name: $tag_name}), (p:Paper {title: $title})
  MERGE (p)-[r:BELONGS_TO]->(t) return r`
  console.log("Paper:" , Paper_result);

  const author_query = `MERGE (a:Author {name: $name}) `; 
  const author_paper_query = `MATCH (a:Author {name: $name}), (p:Paper {title: $title}) 
   MERGE (p)-[r:WRITEN_BY]->(a)  return r`


  tags.map(async element => {
    console.log("create tag:",  element);
    await Neo4jAsk(tag_query, {tag_name: element  });
    console.log("link tag:", element, " to paper:" , title);
    await Neo4jAsk(tag_paper_link , {tag_name: element , title: title });
  
    // console.log(element); // 执行某些操作
    return element; // 即使你不使用返回的数组，也需要返回值
});

  authors.map(async a => {
    await Neo4jAsk(author_query, {  name: a  });
    console.log("create author:",  a);
    await Neo4jAsk(author_paper_query, {  name: a ,title : title });
    console.log("link author:",  a ,"to paper:" , title);
  }
     
  )


  console.log('Success:', values);
};


const onFinish_Filelist = (values) => {

        for(let i = 0 ; i < values.documents.length; i ++)
          {
            // console.log("VALUE:" , values.documents[i]["selected"]);
            if (values.documents[i]["selected"] === true){
              const value = {};
              const res = values.documents[i];
              value["Year"] = 'unknown';
              value["Journal"] = 'unknown';
              value["Title"] = res["title"];
              value["path"] = res["path"];
              value["authors"] = res["author"];
              AddPaper(value);
              console.log("VALUE:" , value);
            }

            // AddPaper(value);
          }


  console.log('Success:', values);
  
  
};


async function  onFinish_note(values)  {

  const title = values["Title"];
  // const Journal = values['Journal'];
  // const Year = values["Year"];
  // const authors = values["authors"];
  const tags = values["tag"];
  const path = values["Path"];

  const now = new Date();
  const formattedDate = now.toLocaleString();
  // query =  'CREATE (p:Paper { journal: $title , title: "good", year: 2024})   RETURN p'
  const note_query = `CREATE (p:Notebook {  title: $title , build_time: $build_time , path: $path  })
       RETURN p`;

      //  `CREATE (p:Paper {journal: $journal, title: $title, year: $year, authors: $authors, tags: $tags}) RETURN p`
  const Paper_result = await  Neo4jAsk(note_query, { title: title,   build_time: formattedDate , path: path  });

  const tag_query = `MERGE (t:Tag {tag_name: $tag_name})`;
  const tag_paper_link = `MATCH (t:Tag {tag_name: $tag_name}), (p:Notebook {title: $title})
  MERGE (p)-[r:BELONGS_TO]->(t) return r`
  console.log("Notebook:" , Paper_result);



  tags.map(async element => {
    console.log("create tag:",  element);
    await Neo4jAsk(tag_query, {tag_name: element  });
    console.log("link tag:", element, " to notebook:" , title);
    await Neo4jAsk(tag_paper_link , {tag_name: element , title: title });
  
    // console.log(element); // 执行某些操作
    return element; // 即使你不使用返回的数组，也需要返回值
});




  console.log('Success:', values);
};



const onFinishFailed_note = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onFinishFailed_tag = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

async function  onFinish_tag(values)  {

  const tag_name = values["Tag_name"];
  const ParentTag = values["selectedOption"][ values["selectedOption"].length - 1  ];


  // ParentTag=1 ; 
  // const Journal = values['Journal'];
  // const Year = values["Year"];
  // const authors = values["authors"];
  // console.log("my tag:", tag_name);


  
  // query =  'CREATE (p:Paper { journal: $title , title: "good", year: 2024})   RETURN p'

  const tag_query = `MERGE (t:Tag {tag_name: $tag_name})`;

  await Neo4jAsk(tag_query, {tag_name : tag_name ,  }  );
  
  console.log("Create tag:" , tag_name);
  const tag_parent_add_link = `MATCH (t:Tag {tag_name: $tag_name}), (tp:Tag {tag_name: $Ptag_name})
  MERGE (t)-[r:IN]->(tp) return r`
  await Neo4jAsk( tag_parent_add_link , {tag_name: tag_name ,Ptag_name: ParentTag   });


  console.log("link tag:" , tag_name , "  to Parent:" , ParentTag );


  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  // forceUpdate();
  if(ParentTag === "All Tags")
  {window.location.reload();}

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



export function ManuallyAddNoteForm({visible , handleCancel}) {
  return (
      <Modal
      title="Add notebook manually"
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
      onFinish={onFinish_note}
      onFinishFailed={onFinishFailed_note}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="Title"
        rules={[{ required: true, message: 'Please input the title of notebook' }]}
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


export function CheckpointForm({visible , handleCancel, Filelist, handleFilelist})
{
  const [form] = Form.useForm();

  useEffect(() => {
    // 构建表单需要的数据结构
    const formValues = {
      documents: Filelist.map(doc => ({
        selected: false, // 默认未选中
        title: doc.title,
        path: doc.path,
        author: doc.author,
        Journal: doc.Journal,
        year: doc.year
      }))
    };
  
    // 使用 setFieldsValue 更新表单值
    form.setFieldsValue(formValues);
  
    console.log("Form values set for updated document list.");
  }, [Filelist, form]);


  return (
    <Modal
    title="Select Your Files"
    visible={visible}
    onCancel={handleCancel}
    footer={null}

  >
    <Form form={form} onFinish={onFinish_Filelist}>  
    {Filelist.length === 0 ? (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Spin size="large" />
                <p>Loading the files.... Please waiting for a moment</p>
              </div>
            ) : (
              <List
                dataSource={Filelist}
                renderItem={(item, index) => (
                  <List.Item>
                    <Form.Item
                      name={['documents', index, 'selected']}
                      valuePropName="checked"
                      initialValue={false}
                      noStyle
                    >
                      <Checkbox />
                    </Form.Item>
                    <Form.Item name={['documents', index, 'title']} initialValue={item.title} noStyle>
                      <Input readOnly style={{ width: '427px', marginRight: '10px' ,       overflow: 'hidden',   textOverflow: 'ellipsis',}} />
                    </Form.Item>
       
                    <Form.Item name={['documents', index, 'path']} initialValue={item.path} hidden>
                      <Input readOnly />
                    </Form.Item>

                      <Form.Item name={['documents', index, 'author']} initialValue={item.author} hidden>
                        <Input readOnly />
                      </Form.Item>

                  </List.Item>
                )}
              />
            )}

            {Filelist.length > 0 && (
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={handleCancel}> 
                  Submit
                </Button>
              </Form.Item>
            )}
        </Form>
    </Modal>
  );

}


export function ManuallyAddTagForm({visible , handleCancel}) {
  const [ParentTag , SetParentTag ] = useState(["All Tags"])
  
  return (
      <Modal
      title="Add notebook manually"
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
      onFinish={onFinish_tag}
      onFinishFailed={onFinishFailed_tag}
      autoComplete="off"
    >
  

      <Form.Item
        label="Tag name"
        name="Tag_name"
        rules={[{ required: true, message: 'Please input the name of tag' }]}
      >
        <Input />
      </Form.Item>

         <TagCascader_Form handleSelectedValues={ SetParentTag} InselectedValues={ParentTag} />
    
  
  
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