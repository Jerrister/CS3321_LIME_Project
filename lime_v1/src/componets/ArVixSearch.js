import React, { useState , useEffect} from 'react';
import { Input, Button, List, Checkbox, Form, Modal, Spin, message } from 'antd';
import axios from 'axios';
import { AddPaper } from '../services/neo4jadd';

const { Search } = Input;



const DocumentSearch = ({visible, setVisible}) => {

  
// console.log("Search:", visible);
// console.log("SeSearch:", setVisible);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [documentList, setDocumentList] = useState([]);
//   const [] = useState(false);

  const handleSearch = async (value) => {
    setLoading(true);
    // setDocumentList([]);
    try {
      const response = await axios.post('http://127.0.0.1:7688/search', { query: value });
      setDocumentList(response.data.result);
      setLoading(false);
      setVisible(true);
      console.log("Search Res:" , response.data.result);
      console.log("Search  Document :", documentList );

    } catch (error) {
      // setDocumentList([]);
      message.error('Search failed');
      setLoading(false);
    }


  };

  const onFinish = (values) => {
    console.log('Selected Documents:', values);
    message.success('Documents submitted');
    // setDocumentList([]);
  

  
    for(let i = 0 ; i < values.documents.length; i ++)
      {
        console.log("VALUE:" , values.documents[i]["selected"]);
        if (values.documents[i]["selected"] === true){
          const value = {};
          const res = values.documents[i];
          value["Year"] = res["year"];
          
          value["Journal"] = res["Journal"];
          value["Title"] = res["title"];
          value["path"] = res["path"];
          value["authors"] = res["author"];
          AddPaper(value);
          console.log("Add VALUE:" , res);
        }

        // AddPaper(value);
      }

    setVisible(false);
  };


  const handleCancel = () => {
    setVisible(false);
    // setDocumentList([]);
  };

  useEffect(() => {
    console.log("Updated Document List:", documentList);
  }, [documentList]);


  const [selectedDocuments, setSelectedDocuments] = useState([]);

  // const [form] = Form.useForm();

  useEffect(() => {
    const initialValues = documentList.map(doc => ({
      selected: false,  // 初始化为未选中
      title: doc.title,
      path: doc.path,
      author: doc.author,
      Journal: doc.Journal,  // 注意属性名称的大小写
      year: doc.year
    }));

    form.setFieldsValue({ documents: initialValues });
    setSelectedDocuments(initialValues.map(() => false));
    console.log("Form FieldValue:", form.getFieldValue() );
    // console.log("Form FieldsValue:", form.getFielsdValue() );
  }, [documentList, form]);


  const handleSelectChange = (checked, index) => {
    const newSelectedDocs = [...selectedDocuments];
    newSelectedDocs[index] = checked;
    setSelectedDocuments(newSelectedDocs);

    // 更新表单字段值
    const currentDocs = form.getFieldValue('documents');
    currentDocs[index].selected = checked;
    form.setFieldsValue({ documents: currentDocs });
  };



  return (
    <div>


      <Modal
        title="Select Your Files"
        visible={visible}
        // onCancel={() => setVisible(false)}
        onCancel={handleCancel}
        footer={null}
      >

    <Search
            placeholder="Enter search content"
            enterButton="Search"
            onSearch={handleSearch}
            style={{ width: 400, marginBottom: 20 }}
          />

        <Form form={form} onFinish={onFinish}>
          {loading ? (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Spin size="large" />
              <p>Searching .... Please wait for a moment ...</p>
            </div>
          ) : (
            <List
              dataSource={documentList}
              renderItem={(item, index) => (
                <List.Item >
                  <Form.Item
                    name={['documents', index, 'selected']}
                    valuePropName="checked"
                    initialValue={false}
                    noStyle
                  >
          
                    <Checkbox  onChange={e => handleSelectChange(e.target.checked, index)} />
                  </Form.Item>
                  <Form.Item name={['documents', index, 'title']} initialValue={item.title} noStyle>
                    <Input
                      readOnly
                      style={{
                        width: '434px',
                        marginRight: '10px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                  </Form.Item>
                  <Form.Item name={['documents', index, 'path']} initialValue={item.path} hidden>
                    <Input readOnly />
                  </Form.Item>
          
                  <Form.Item name={['documents', index, 'author']} initialValue={item.author} hidden>
                    <Input readOnly />
                  </Form.Item>
            
                  <Form.Item name={['documents', index, 'Journal']} initialValue={item.Journal} hidden>
                    <Input readOnly />
                  </Form.Item>

                  <Form.Item name={['documents', index, 'year']} initialValue={item.year} hidden>
                    <Input readOnly />
                  </Form.Item>
          
                </List.Item>
              )}
            />
          )}

          {documentList.length > 0 && (
            <Form.Item>
              <Button type="primary" htmlType="submit"  onClick={handleCancel}> 
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentSearch;