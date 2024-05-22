import { Button, Checkbox, Form, Input , Modal ,Space, List, Spin, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, {useEffect, useState, useReducer} from 'react';
import { modifyNotebook, modifyPaper, modifyTag } from '../services/ModifyNode';

// import { AddTag } from '../services/neo4jadd';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



const EditPaper_onFinish = async (values) =>{
 console.log("EditPaper:" , values);
//  values['title'] = values['title'];
//  values['year'] = values['year'][0];
 console.log("path :" , values['path'] );
 console.log('path: ' , typeof(values['path'])  === 'undefined');

 if (typeof(values['path'])  === 'undefined')
    {
        values['path'] = '';
    }


 values['journal'] = values["Journal"];
//  console.log( values['year'][0]);
 await modifyPaper(values["init_title"], values);
 window.location.reload();
//  调用后端接口
//  change_paper(values["init_title"], values);
//  return 

}


const EditNote_onFinish = async (values) =>{

    console.log("EditNote:" , values);

    values['name'] = values['title']

   
    if (typeof(values['path'])  === 'undefined')
        {
            values['path'] = '';
        }

     values['journal'] = values["Journal"];
    //  console.log( values['year'][0]);
    await modifyNotebook(values["init_title"], values);
    
    window.location.reload();
   //  调用后端接口
//    values['']
//     change_note(values["init_title"], values);
   
   }
  

export  function EditPaperForm({visible , handleCancel, initValue}) {

    const [form] = Form.useForm();

    // console.log("In Paper Edit:" , initValue)

    console.log("in editPaperform initValue :" , initValue);

    const search_tag_list = ['Initial Tag', 'Tag1'];
    const author_list = ["Author1", "Author2"];

    useEffect(() =>{

        console.log("set title in effect:", initValue['title']);
        form.setFieldValue('title',initValue['title']);
        form.setFieldValue('init_title',initValue['title']);

        // 调用一下search方法
        const search_tag_list = ['Initial Tag', 'Tag1'];
        const author_list = ["Author1", "Author2"];
        

        form.setFieldValue('authors',author_list);
        form.setFieldValue('Journal',initValue['source']);
        form.setFieldValue('year',initValue['year']);
        form.setFieldValue('path',initValue['path']);


    },[initValue]);

    

    return (
        <Modal
        title="Add reference manually"
        visible={visible}
        onCancel={handleCancel}
        footer={null}

      >
        <Form
        form = {form}
        name="basic"
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        // initialValues={{ 
        //     remember: true,
        //     // title: ,
        //     // year: ,
        //     // Journal: initValue['source'],
        //     // path: initValue['path'],
        //     // tag: search_tag_list,
        //     // authors: author_list,
        //     // init_title:  initValue['title']
        //   }}
        onFinish={EditPaper_onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title of reference' }]}
        //   initialValue={[initValue['title']]}
        >
          <Input />
        </Form.Item>
    
 
    
        <Form.List
        name="authors"
        label="Author(s)"
        // initialValue={author_list} // 初始化时有一个作者输入
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
          label="source"
          name="Journal"
          style={{margin: "-15px 0 0px 0px"}} 
          rules={[{ required: true, message: 'Please input the title of reference' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Year"
          name="year"
        //   value={[initValue['year']]}
          rules={[{ required: true, message: 'Please input the title of reference' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Path"
          name="path"
        //   value={initValue['path']}
        //   rules={[{ required: f, message: 'Please input the local path of reference' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="init_title"
          name="init_title"
        //   value={initValue['title']}
          hidden
        //   rules={[{ required: true, message: 'Please input the local path of reference' }]}
        >
          <Input />
        </Form.Item>
        


        <Form.List
        name="tag"
        label="Tag(s)"
        // initialValue={search_tag_list} // 初始化时有一个作者输入
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


export  function EditNoteForm({visible , handleCancel, initValue}) {

    const [form] = Form.useForm();


    
    console.log("in editPaperform initValue :" , initValue);

    const search_tag_list = ['Initial Tag', 'Tag1'];
    // const author_list = ["Author1", "Author2"];

    

    useEffect(() =>{

        console.log("set title in effect:", initValue['title']);
        form.setFieldValue('title',initValue['title']);
        form.setFieldValue('init_title',initValue['title']);
        
        // 调用一下search方法
        const search_tag_list = ['Initial Tag', 'Tag1'];
        const author_list = ["Author1", "Author2"];
        form.setFieldValue('tag' , search_tag_list);
        form.setFieldValue('path',initValue['path']);


    },[initValue]);



    return (
        <Modal
        title="Add reference manually"
        visible={visible}
        onCancel={handleCancel}
        footer={null}

      >
        <Form
        form = {form}
        name="basic"
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ 
            remember: true,
            title: initValue['title'],
            // year: initValue['year'],
            // Journal: initValue['source'],
            path: initValue['path'],
            tag: search_tag_list,
            // authors: author_list,
            init_title:  initValue['title']
          }}
        onFinish={EditNote_onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title of reference' }]}
        >
          <Input />
        </Form.Item>
    
 


        <Form.Item
          label="Path"
          name="path"
          rules={[{ required: true, message: 'Please input the local path of reference' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="init_title"
          name="init_title"
          hidden
        //   rules={[{ required: true, message: 'Please input the local path of reference' }]}
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



// export function EditagForm({visible , handleCancel}) {
//   const [ParentTag , SetParentTag ] = useState(["All Tags"])

//   const onFinishFailed_tag = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };
  
//   async function  onFinish_tag(values)  {
  
//     const tag_name = values["Tag_name"];
//     const ParentTag = values["selectedOption"][ values["selectedOption"].length - 1  ];
  
  
//     // ParentTag=1 ; 
//     // const Journal = values['Journal'];
//     // const Year = values["Year"];
//     // const authors = values["authors"];
//     // console.log("my tag:", tag_name);
  
  
    
//     // query =  'CREATE (p:Paper { journal: $title , title: "good", year: 2024})   RETURN p'
  
//     // const tag_query = `MERGE (t:Tag {tag_name: $tag_name})`;
  
//     // await Neo4jAsk(tag_query, {tag_name : tag_name ,  }  );
    
//     // console.log("Create tag:" , tag_name);
//     // const tag_parent_add_link = `MATCH (t:Tag {tag_name: $tag_name}), (tp:Tag {tag_name: $Ptag_name})
//     // MERGE (t)-[r:IN]->(tp) return r`
//     // await Neo4jAsk( tag_parent_add_link , {tag_name: tag_name ,Ptag_name: ParentTag   });
  
  
//     // console.log("link tag:" , tag_name , "  to Parent:" , ParentTag );
  
//     const AddSuccess = AddTag(tag_name, ParentTag);
  
//     // console.log("ADD SUCC:" , AddSuccess.result);
  
//     AddSuccess.then((result) =>
//       {
//         if(result)
//           {
//             message.success("Success: Add Tag " + tag_name)
//           }
//           else
//           {
//             message.error("Failed: Tag " + tag_name +  " have existed!" );
//           }
//       }
//     )
  
  
//     // const [, forceUpdate] = useReducer(x => x + 1, 0);
//     // forceUpdate();
//     if(ParentTag === "All Tags")
//     {window.location.reload();}
//     // setflash(!flash);
//     // console.log("Flash toogler:", toogleFlash);
//     // toogleFlash();
//     // setflash(!flash);
    
  
//     console.log('Success:', values);
//   };
  
//   return (
//       <Modal
//       title="Add notebook manually"
//       visible={visible}
//       onCancel={handleCancel}
//       footer={null}

//     >
//       <Form
//       name="basic"
//       layout='vertical'
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 20 }}
//       style={{ maxWidth: 600 }}
//       initialValues={{ remember: true }}
//       onFinish={onFinish_tag}
//       onFinishFailed={onFinishFailed_tag}
//       autoComplete="off"
//     >

//       <Form.Item
//         label="Tag name"
//         name="Tag_name"
//         rules={[{ required: true, message: 'Please input the name of tag' }]}
//       >
//         <Input />
//       </Form.Item>

//          <TagCascader_Form handleSelectedValues={ SetParentTag} InselectedValues={ParentTag} />
    
  
  
//       <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//         <Button type="primary" htmlType="submit" onClick={handleCancel}>
//           Submit
//         </Button>

//         <Space /> <Space /><Space />   <Space /> <Space /><Space />

//         <Button type="primary"  onClick={handleCancel} style={{margin :" 0px 0 0 25px"}}>
//           Cancel
//         </Button>
//       </Form.Item>




//     </Form>
//     </Modal>
//   )
// }