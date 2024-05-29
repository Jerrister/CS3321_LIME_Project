import { Button, Checkbox, Form, Input , Modal ,Space, List, Spin, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, {useEffect, useState, useReducer} from 'react';
import { modifyNotebook, modifyPaper, modifyTag } from '../services/ModifyNode';
import { Cut_TagCascader_Form } from './tag_cascader_form';
import { findAuthorQuery, findNote_TagQuery, findTagQuery } from '../services/neo4jService';

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
//  window.location.reload();
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
    
    // window.location.reload();
   //  调用后端接口
//    values['']
//     change_note(values["init_title"], values);
   
   }
  

export  function EditPaperForm({visible , handleCancel, initValue}) {

    const [form] = Form.useForm();
    const [search_tag_list , set_search_tag_list] = useState([]);

    const [search_author_list , set_search_author_list] = useState([]);


    // console.log("In Paper Edit:" , initValue)

    console.log("in editPaperform initValue :" , initValue);


    const fetchData = async () => {
       

        if (initValue.length !== 0) {
            set_search_tag_list(await findTagQuery(initValue["title"]));
            set_search_author_list(await findAuthorQuery(initValue["title"]));

            // search_tag_list = 
        }
        // search_tag_list = ["init Tag"]

        console.log("in useeffect search_atg_list:", search_tag_list);

    
    };



    useEffect(() =>{

        console.log("set title in effect:", initValue['title']);
        form.setFieldValue('title',initValue['title']);
        form.setFieldValue('init_title',initValue['title']);

        

        // 调用一下search方法

    
        console.log("in editPaperform initValue :", initValue.PromiseResult);

        fetchData();

    
        // const search_tag_list = ['Initial Tag', 'Tag1'];
        // const author_list = ["Author1", "Author2"];

        console.log("in editPaperform initValue :", search_tag_list);
        form.setFieldValue('tag',search_tag_list);
        form.setFieldValue('authors',search_author_list);
        form.setFieldValue('Journal',initValue['source']);
        form.setFieldValue('year',initValue['year']);
        form.setFieldValue('path',initValue['path']);


    },[initValue]);

    

    return (
        <Modal
        title="Edit reference "
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
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="init_title"
          name="init_title"
          hidden
        >
          <Input />
        </Form.Item>
        


        <Form.List
        name="tag"
        label="Tag(s)"
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

    const [search_tag_list , set_search_tag_list] = useState([]);



    const fetchData = async () => {
       
        if (initValue.length !== 0) {
            set_search_tag_list(await findNote_TagQuery(initValue["title"]));
 
        }
        // search_tag_list = ["init Tag"]

        console.log("in useeffect search_atg_list:", search_tag_list);

    
    };




    
    console.log("in editPaperform initValue :" , initValue);


    // const author_list = ["Author1", "Author2"];
    console.log("search_atg_list:",  search_tag_list);
    

    useEffect(() =>{
        fetchData();

        console.log("set title in effect:", initValue['title']);
        form.setFieldValue('title',initValue['title']);
        form.setFieldValue('init_title',initValue['title']);

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



export function EditTagForm({visible , handleCancel, curtag}) {
  const [ParentTag , SetParentTag ] = useState(["All Tags"])
  console.log("curtag in edit tag form", curtag);

  useEffect(() => {}, [curtag]);

  const onFinishFailed_tag = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  async function  onFinish_tag(values)  {


    if (typeof values["selectedOption"] == "undefined"){
      values["selectedOption"] = ["All Tags"]
    }

    console.log("values", values)
    const new_name = values["Tag_name"];
    const ParentTag = values["selectedOption"][ values["selectedOption"].length - 1  ];

    const params = {this: curtag, new_name : new_name, new_parent : ParentTag};

    console.log("modify params: ", params);
  
    const ModSuccess = modifyTag(params);
  
    // console.log("ADD SUCC:" , AddSuccess.result);
  
    ModSuccess.then((result) =>
      {
        if(result){
            message.success("Successfully Edit Tag " + curtag)
          }
          else{
            message.error("Failed to edit: " + curtag);
          }
          window.location.reload();
      }
    )
    // const [, forceUpdate] = useReducer(x => x + 1, 0);
    // forceUpdate();
    // if(ParentTag === "All Tags")
    //   {window.location.reload();}
    // setflash(!flash);
    // console.log("Flash toogler:", toogleFlash);
    // toogleFlash();
    // setflash(!flash);
  
    console.log('Success:', values);
  };

  const title = `Edit Tag ${curtag}`
  
  return (
      <Modal
      title={title}
      visible={visible}
      onCancel={handleCancel}
      footer={null}

    >
      <Form
      key={curtag}
      name="basic"
      layout='vertical'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 600 }}
      initialValues={{ 
        Tag_name : curtag,
        remember: true,
      }}
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

         <Cut_TagCascader_Form handleSelectedValues={ SetParentTag} InselectedValues={ParentTag} CutTag={curtag} />
    
  
  
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