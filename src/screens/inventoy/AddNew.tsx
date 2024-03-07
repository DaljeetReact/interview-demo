import { Content } from "antd/es/layout/layout";
import {  Button, Form, Input, Select,Switch, Space,InputNumber, Divider, Row, Col, Flex, Typography, Card, DatePicker, TimePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";

import '@mdxeditor/editor/style.css';
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import dayjs from 'dayjs';

const { Text } = Typography;
const { TextArea } = Input;

function AddNew() {
  const [form] = Form.useForm();
  const onFinish = (values:any) => {
     console.log(values);
  }


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
              <Col lg={16}>
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
                            defaultValue=""
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
                            defaultValue=""
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
                                        defaultValue=""
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
                                      
                        <Text>Product Long Description</Text>
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
                          <p className="font-color1">Add a long Description about product</p>
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
              <Col lg={8}>
                <Card  style={{ padding:20 }}>
                  1
                </Card>
              </Col>
            </Row>
          </Form>
    </Content>
  )
}

export default AddNew;