import { Content } from "antd/es/layout/layout"
import { TableColumnsType, Typography,Flex,Button,Row,Col,Card,Avatar, Divider, Table } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { useState } from "react";
import Search from "antd/es/transfer/search";
import { FiFilter } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
const { Text } = Typography;
interface DataType {
  key: React.Key;
  name: string;
  category:string;
  price:number;
  instock:number;
  discount:number;
  totalValue:number;
  action:string;
  status:string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
    },
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Unit Price',
    dataIndex: 'price',
  },
  {
    title: 'In-Stock',
    dataIndex: 'instock',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
  },
  {
    title: 'Total Value',
    dataIndex: 'totalValue',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `${i} Edward King `,
    category: 'Mobiles',
    price: i,
    instock: 0,
    discount: 0,
    totalValue: 0,
    action: "hello",
    status: "status"
  });
}


const  Inventory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Content>
      <Flex justify="space-between" align="center">
       <Text  style={{ fontSize:18,fontWeight:"normal" }} className="font-color1">Inventory Summary</Text>
       <Button type="primary" icon={<PlusOutlined />} size={"middle"} className="bg2" style={{borderRadius:10 }}>
            Add a New Product
        </Button>
      </Flex>

      <Divider style={{borderColor:'transparent' }}/>

       <Row gutter={16}>
        <Col xs={24}  sm={6} md={12} lg={12} xl={12} >
          <Card bordered={false} className="bg2" >
              <Row>
                <Col>
                < Avatar style={{ background:'#ffffff42' }} shape="square" size={35}  icon={<IoFolderOpenOutline />} />
                </Col>
              </Row>
              <Divider style={{borderColor:'transparent',margin:'15px 0px' }}/>
              <Row>
                <Col  flex="1">
                    <div>
                      <Text  style={{ color:'#ffffff',fontSize:14,fontWeight:'lighter' }}>All Products</Text>
                    </div>
                    <div>
                      <Text  style={{ color:'#ffffff',fontSize:20 }} >350</Text>
                    </div>
                </Col>
                <Col  flex="1">
                    <div>
                      <Text  style={{ color:'#ffffff',fontSize:14,fontWeight:'lighter'  }}>Active</Text>
                    </div>
                    <div>
                      <Text   style={{ color:'#ffffff',fontSize:20 }} >316</Text>
                    </div>
                </Col>
              </Row>
          </Card>
        </Col>
        <Col xs={24}  sm={6}  md={12} lg={12}   xl={12} >
        <Card bordered={false} >
              <Row>
                <Col>
                < Avatar className="bgh2" style={{ color:'#000000' }} shape="square" size={35}  icon={<FiUsers />} />
                </Col>
              </Row>
              <Divider style={{borderColor:'transparent',margin:'15px 0px' }}/>
              <Row>
                <Col  flex="1">
                    <div>
                      <Text  style={{ color:'red', fontSize:14,fontWeight:'200' }}>Low Stock Alert</Text>
                    </div>
                    <div>
                      <Text  style={{fontSize:20 }} >350</Text>
                    </div>
                </Col>
                <Col  flex="1">
                    <div>
                      <Text  style={{fontSize:14,fontWeight:'lighter'  }}>Expired</Text>
                    </div>
                    <div>
                      <Text   style={{fontSize:20 }} >3</Text>
                    </div>
                </Col>
                <Col  flex="1">
                    <div>
                      <Text  style={{fontSize:14,fontWeight:'lighter'  }}>1 Start Rating</Text>
                    </div>
                    <div>
                      <Text   style={{fontSize:20 }} >2</Text>
                    </div>
                </Col>
              </Row>
          </Card>
        </Col>
      </Row>

      <Divider style={{borderColor:'transparent' }}/>

      <Row>
        <Col flex={1}>
          <Card  style={{ padding:15 }}>
            <Flex justify="space-between">
                <Text style={{ fontSize:20 }}>
                  Inventory Items
                </Text>
                <Flex gap={15}>
                  <Search placeholder="Search"/>
                  <Button type="default" icon={<FiFilter />} size={"middle"} className="font-color1" style={{ fontSize:15 ,borderColor:'#000000',fontWeight:"200"}}>
                    Filter
                  </Button>
                  <Button type="default" icon={<IoCalendarOutline />} size={"middle"} className="font-color1" style={{ fontSize:15 ,borderColor:'#000000',fontWeight:"200"}}>
                    Filter
                  </Button>
                  <Button type="default" icon={<BsSend />} size={"middle"} className="font-color1" style={{ fontSize:15 ,borderColor:'#000000',fontWeight:"200"}}>
                    Share
                  </Button>
                  <Button type="default" icon={<FiFilter />} size={"middle"}>
                    Filter
                  </Button>
                </Flex>
            </Flex>
            <Divider/>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>

    </Content>
  )
}

export default Inventory