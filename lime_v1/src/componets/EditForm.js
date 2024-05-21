import { Button, Checkbox, Form, Input , Modal ,Space, List, Spin, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

// import { AddTag } from '../services/neo4jadd';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };




const EditPaper_onFinish = (values) =>{

 console.log("EditPaper:" , values);

//  调用后端接口
//  change_paper(values["init_title"], values);

 return 

}


const EditNote_onFinish = (values) =>{

    console.log("EditNote:" , values);
   
   //  调用后端接口
   //  change_note(values["init_title"], values);
   
    return 
   
   }
  

export  function EditPaperForm({visible , handleCancel, initValue}) {

    // const [form] = Form.useForm();


    
    console.log("in editPaperform initValue :" , initValue);

    const search_tag_list = ['Initial Tag', 'Tag1'];
    const author_list = ["Author1", "Author2"];

    




    return (
        <Modal
        title="Add reference manually"
        visible={visible}
        onCancel={handleCancel}
        footer={null}

      >
        <Form
        // form = {form}
        name="basic"
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ 
            remember: true,
            title: initValue['title'],
            year: initValue['year'],
            Journal: initValue['source'],
            path: initValue['path'],
            tag: search_tag_list,
            authors: author_list,
            init_title:  initValue['title']
          }}
        onFinish={EditPaper_onFinish}
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


export  function EditNoteForm({visible , handleCancel, initValue}) {

    // const [form] = Form.useForm();


    
    console.log("in editPaperform initValue :" , initValue);

    const search_tag_list = ['Initial Tag', 'Tag1'];
    // const author_list = ["Author1", "Author2"];

    




    return (
        <Modal
        title="Add reference manually"
        visible={visible}
        onCancel={handleCancel}
        footer={null}

      >
        <Form
        // form = {form}
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