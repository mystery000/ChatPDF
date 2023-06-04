import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserAddOutlined, UnlockOutlined } from '@ant-design/icons';

import LogoSrc from '../../assets/images/logo.png';
import { clearErrors } from '../../redux/auth/authSlice';

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
        <Header className='bg-white flex items-center justify-between'>
          <div className="demo-logo">
            <img src={LogoSrc} alt="logo" className='w-[220px]' />
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