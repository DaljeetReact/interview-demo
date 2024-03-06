import React, {useState } from 'react';

import type { MenuProps } from 'antd';
import { Breadcrumb, Divider, Flex, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { motion } from "framer-motion"

import { RxDashboard } from "react-icons/rx";
import { SlHandbag } from "react-icons/sl";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsFolderFill } from "react-icons/bs";
import { PiChatCircleDots } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import logo from '../assets/pie-chart.png';
import Title from 'antd/es/typography/Title';
import { Typography } from 'antd';
import HeaderMain from './HeaderMain';
const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const MenuItemWithCount = (props:{children:React.ReactNode,count:string})=>{
  return(
    <div className='menu-item-count'>
      {props.children}
      <span>{props.count}</span>
    </div>
  );
}

const items: MenuItem[] = [
  getItem('Dashboard', '1', <RxDashboard />),
  getItem('Orders', '2',<MenuItemWithCount children={<SlHandbag />}  count={'30'}/>),
  getItem('Customers', 'sub1', <HiOutlineUsers />),
  getItem('Inventory', 'sub2', <BsFolderFill />),
  getItem('Conversations', '9', <PiChatCircleDots />),
  getItem('Settings', '10', <IoSettingsOutline />),
];



const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setThemeMode] = useState<'light' | 'dark'>('light');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
      theme={mode}
      >
        <Flex className='sidebar-logo-container' align='center' justify='center' gap={10} style={{ padding:'0px 20px', marginBottom:'40px' }} >
          <img className='sidebar-logo' src={logo} alt='logo'/>
        </Flex>
        <Menu
        theme={mode} defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      
      <Layout>
        <HeaderMain/>
        <Divider style={{ margin:0,background:'#fafafa' }}/>
         <div style={{ padding: '2px 16px',backgroundColor:'#ffffff',  marginBottom:'20px'}}>
            
            <Breadcrumb style={{fontSize:12 }} >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Inventory</Breadcrumb.Item>
            </Breadcrumb>
         </div>

        <Content style={{ margin: '0 16px' }}>
          <div
            style={{
              padding: 0,
              minHeight: '100vh',
            }}
          >
             <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
           <a href='http://daljeetsolutions.com/'>Design by DaljeetSolutions</a> 
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;