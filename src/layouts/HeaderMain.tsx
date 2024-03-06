import { Flex, theme, MenuProps, Dropdown, Space, Typography, Avatar,Breadcrumb, Divider } from 'antd';
import { Header } from "antd/es/layout/layout"
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { FaBell } from "react-icons/fa";

const { Text } = Typography;

const HeaderMain: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items: MenuProps['items'] = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} id='top-header'>
            <div style={{ borderBottomWidth:2 }}>
                <Flex justify='space-between' align='center' style={{ padding:'0 20px' }}>
                    <Text style={{ fontSize: '18px' }} className='font-color1'>Inventory</Text>
                    <Flex justify='space-between' gap={34} className='header-right'>
                        <div>
                            <Dropdown menu={{ items }} trigger={['click']} className='user-drop-down'>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        Nanny's Shop
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                        <div>
                        <FaBell />
                        </div>
                        <div>
                            <Avatar shape="square" size={34} icon={<UserOutlined />} />
                        </div>
                    </Flex>
                </Flex>
            </div>
          
        </Header>
    )
}

export default HeaderMain