import React, {useState,useEffect } from 'react';

import type { MenuProps } from 'antd';
import { Breadcrumb, Divider, Flex, Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';

import { RxDashboard } from "react-icons/rx";
import { SlHandbag } from "react-icons/sl";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsFolderFill } from "react-icons/bs";
import { PiChatCircleDots } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import logo from '../assets/pie-chart.png';
import HeaderMain from './HeaderMain';
import { Link } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

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

const AddLink =(props:{label:string,linkto:string})=>(
  <Link to={props.linkto}>
      {props.label}
  </Link>
)

const items: MenuItem[] = [
  getItem('Dashboard', '1', <RxDashboard />),
  getItem('Orders', '2',<MenuItemWithCount children={<SlHandbag />}  count={'30'}/>),
  getItem('Customers', 'sub1', <HiOutlineUsers />),
  getItem(<AddLink  label='Inventory' linkto='/inventory' />, 'sub2', <BsFolderFill />),
  getItem('Conversations', '9', <PiChatCircleDots />),
  getItem('Settings', '10', <IoSettingsOutline />),
];




const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setThemeMode('light')
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    //console.log('click ', e);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
      theme={mode}
      >
        <Flex className='sidebar-logo-container' align='center' justify='center' gap={10} style={{ padding:'0px 20px', marginBottom:'40px' }} >
          <img className='sidebar-logo' src={logo} alt='logo'/>
        </Flex>
        <Menu
        onClick={onClick}
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