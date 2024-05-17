import React from 'react';
import { Button, Checkbox, Form, Input , Modal ,Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const onFinish = (values) => {
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