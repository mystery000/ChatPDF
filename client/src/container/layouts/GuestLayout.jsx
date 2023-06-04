import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserAddOutlined, UnlockOutlined } from '@ant-design/icons';

import { clearErrors } from '../../redux/auth/authSlice';
import LogoSrc from '../../assets/images/logo.png';
import smLogoSrc from '../../assets/images/logo-sm.png';

const { Header, Content } = Layout;

const items = [
  {
    label: 'Login',
    key: '/auth/login',
    icon: <UnlockOutlined />,
  },
  {
    label: 'Register',
    key: '/auth/register',
    icon: <UserAddOutlined />
  },
];

function GuestLayout({
  children
}) {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = ({ item, key }) => {
    dispatch(clearErrors());
    navigate(key + location.search);
  }

  return (
    <Layout>
      {/*<Sider/>*/}
      <Layout>
        <Header className='bg-white flex items-center justify-between px-[20px]'>
          <div className="demo-logo">
            <Link to="/" className='hidden sm:inline' ><img src={LogoSrc} alt="logo" className='w-[200px] p-3' /></Link>
            <Link to="/" className='inline sm:hidden'><img src={smLogoSrc} alt="logo" className='w-[64px] p-3' /></Link>
          </div>
          <div className='w-[200px]'>
            <Menu theme='light' mode="horizontal" items={items} defaultSelectedKeys={[location.pathname]} onClick={handleClick} />
          </div>
        </Header>
        <Content className='w-screen flex items-center justify-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default GuestLayout;