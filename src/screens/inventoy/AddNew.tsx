import { Content } from "antd/es/layout/layout";
import {  Button, Form, Input,  message,UploadFile, Upload, GetProp, UploadProps,Select,Switch, Space,InputNumber, Divider, Row, Col, Flex, Typography, Card, DatePicker, TimePicker, Avatar, Modal } from "antd";
import { CloudUploadOutlined, DeleteOutlined, DownOutlined ,LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import '@mdxeditor/editor/style.css';
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import dayjs from 'dayjs';
import { useState } from "react";
import imageFile from "../../assets/photo.png"

const { Text } = Typography;
const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const getBase64Multiple = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


function AddNew() {
  const [form] = Form.useForm();
  const onFinish = (values:any) => {
     console.log(values);
  }

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreviewMultiple = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64Multiple(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChangeMultiple: UploadProps['onChange'] = ({ fileList: newFileList }) =>setFileList(newFileList);


  const uploadButton = (
    <Card   className="upload-card p0">
        <div style={{ background:'' }}>
            <div>
              {loading ? 
                <LoadingOutlined /> :
                (
                  <img src={imageFile} className="upload-icon" />
                )
              }
            </div>
           
            <Text className="font-color-blue"><CloudUploadOutlined />  Upload Image</Text>
            <div style={{ marginTop: 8,textAlign:'center',lineHeight:2 }} >
              
                Upload a cover image for your product.
                <br/>
                File Format jpeg, png Recommened Size 600x600 (1:1)
            </div>
        </div>
    </Card>
  );


  const ImagePreview = (
      <Card   className="upload-card-preview p0">
          <div className="upload-action-controls">
            <Avatar style={{ background:'#FFCC91', color:'#41424A' }} shape="square" size={30}  icon={<CloudUploadOutlined />} />
            <Avatar style={{ background:'#FFCC91',color:'#41424A' }} shape="square" size={30}  icon={<DeleteOutlined/>} />
            
          </div>
          <img src={imageUrl} alt="avatar"  />
      </Card>
  );

  const uploadButtonMultiple = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <img src={imageFile}  style={{ height:40 }} />
      <p>
      <Text className="font-color-blue"><CloudUploadOutlined />  Upload Image</Text>
      </p>
    </button>
  );

  return (
    <Content>
          <Form
            name="addNewItem"
            form={form}
            onFinish={onFinish}
          >
            <Flex justify="space-between" align="center">
              <Text style={{ fontSize: 18, fontWeight: "normal" }} className="font-color1">Inventory Summary</Text>

              <Flex gap={20}>
                <Button type="primary" size={'middle'} style={{ background: '#282832', padding: '8px 25px', height: 'auto', borderRadius: 12 }}>
                  Save as Draft
                  <Divider type="vertical" style={{ background: '#c1c1c1', margin: '0 20px' }} />
                  <DownOutlined />
                </Button>
                <Button type="primary" size={'middle'} className="bg2" style={{ padding: '8px 25px', height: 'auto', borderRadius: 12 }}>
                  Save & Publish
                </Button>
              </Flex>

            </Flex>

            <Divider style={{ borderColor: 'transparent' }} />

            <Row gutter={20}>
              <Col lg={15}>
                <Card  style={{ padding:20 }}>
                   <Row gutter={40}>
                      <Col lg={12}>
                        <Text style={{ fontSize:12}} className="font-color1">Product Name</Text>
                        <Form.Item name="name"  rules={[{ required: true }]}>
                          <Input  placeholder="Product name" />
                        </Form.Item>

                        <Form.Item name="category"  rules={[{ required: true }]}> 
                          <Select
                            placeholder="Select Product Category"
                            options={[
                              { value: 'cat1', label: 'Category 1' },
                              { value: 'cat2', label: 'Category 2' },
                              { value: 'cat3', label: 'Category 3' },
                            ]}
                            style={{ background:'#F3F5FA' }}
                          />
                        </Form.Item>
                        <Flex gap={20} align="stretch" justify="space-between">
                          <Form.Item name="sale-price"  rules={[{ required: true }]}>
                            <Input size="large"  placeholder="Selling Price" />
                          </Form.Item>
                          <Form.Item name="cost-price"  rules={[{ required: true }]}>
                            <Input  size="large" placeholder="Cost Price"  />
                          </Form.Item>
                        </Flex>

                        <Form.Item name="stock" >
                          <InputNumber placeholder="Quantity in Stock"  />
                        </Form.Item>

                        <Form.Item name="order-type"  rules={[{ required: true }]}> 
                          <Select
                            placeholder="Order Type"
                            options={[
                              { value: 'order-type1', label: 'Order Type 1' },
                              { value: 'order-type2', label: 'Order Type 2' },
                              { value: 'order-type3', label: 'Order Type 3' },
                            ]}
                            style={{ background:'#F3F5FA' }}
                          />
                        </Form.Item>
                        
                        <Row>
                            <Col lg={12}>
                                <Text style={{fontSize:'16px',display:'inline-block' }} className="font-color1" >Discount</Text>
                            </Col>
                            <Col lg={12} >
                              <Flex style={{float:"right" }}>

                                <Form.Item label="Add Discount" valuePropName="checked" >
                                  <Switch title="Add Discount" />
                                </Form.Item>
                              </Flex>
                            </Col>
                        </Row>


                        <Row gutter={20}>
                            <Col lg={12}>
                                <Form.Item name="type">
                                      <Select
                                        placeholder="Type"
                                        options={[
                                          { value: 'type1', label: 'Type 1' },
                                          { value: 'type2', label: 'Type 2' },
                                          { value: 'type3', label: 'Type 3' },
                                        ]}
                                        style={{ background:'#F3F5FA' }}
                                      />
                                </Form.Item>
                            </Col>
                            <Col lg={12}>
                              <Form.Item name="type">
                                <Input placeholder="Value" />
                              </Form.Item>
                            </Col>
                        </Row>


                        <Row >
                            <Col lg={12}>
                                <Text style={{fontSize:'16px',display:'inline-block' }} className="font-color1" >Expiry Date</Text>
                            </Col>
                            <Col lg={12} >
                              <Flex style={{float:"right" }}>
                                <Form.Item label="Add Expiry Date" valuePropName="checked">
                                   <Switch title="Add Discount" />
                                </Form.Item>
                              </Flex>
                            </Col>
                        </Row>
                        <Form.Item >
                            <DatePicker size={"large"} />
                        </Form.Item>

                      </Col>
                      <Col lg={12}>
                        
                        <Form.Item >
                          <TextArea rows={4} placeholder="Short description" maxLength={6} />
                        </Form.Item>
                                      
                        <Text style={{ fontSize:12}} className="font-color1">Product Long Description</Text>
                        <Form.Item >
                          <MDXEditor
                            plugins={[
                              toolbarPlugin({
                                toolbarContents: () => (
                                  <>
                                    {' '}
                                    <UndoRedo />
                                    <BoldItalicUnderlineToggles />
                                  </>
                                )
                              })
                            ]} markdown={""} 
                          />
                          <Text style={{ fontSize:12}} className="font-color1">Add a long Description about product</Text>
                        </Form.Item>

 
                        <Row>
                            <Col lg={12}>
                                <Text style={{fontSize:'16px',display:'inline-block' }} className="font-color1" >Return Policy</Text>
                            </Col>
                            <Col lg={12} >
                              <Flex style={{float:"right" }}>

                                <Form.Item label="Add Discount" valuePropName="checked" >
                                  <Switch title="Add Discount" />
                                </Form.Item>
                              </Flex>
                            </Col>
                        </Row>
                        <Text style={{fontSize:12 }} >Date Added</Text>
                        <Row gutter={20}>
                            <Col lg={12}>
                              <Form.Item >
                                  <DatePicker size={"large"} />
                              </Form.Item>
                            </Col>
                            <Col lg={12} >
                              <Form.Item >
                                <TimePicker defaultValue={dayjs('12:08:23')} />
                              </Form.Item>
                              </Col>

                        </Row>
                      </Col>
                   </Row>
                </Card>
              </Col>
              <Col lg={9}>
                <Card  style={{ padding:20 }}>
                    
                      <Upload
                      name="avatar"
                      className="flex-center"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? ImagePreview : uploadButton}
                    </Upload>
                    
                    <Text style={{ margin:'10px 0px',display:'block' }}>Additional Images</Text>
                
                            

                    <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreviewMultiple}
                    onChange={handleChangeMultiple}
                    className="multiple-uploads"
                  >
                    {fileList.length >= 8 ? null : uploadButtonMultiple}
                  </Upload>
                  
                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>

                </Card>
              </Col>
            </Row>
          </Form>
    </Content>
  )
}

export default AddNew;