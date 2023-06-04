import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Button, Dropdown } from 'antd';
import { LockOutlined, UserOutlined, AreaChartOutlined, SafetyOutlined, IdcardOutlined, UnorderedListOutlined, CommentOutlined } from '@ant-design/icons';

import { logout } from '../../redux/auth/authSlice';
import LogoSrc from '../../assets/images/logo.png';
import smLogoSrc from '../../assets/images/logo-sm.png';

const { Header } = Layout;

const items = [
  {
    label: 'Chat',
    key: '/home',
    icon: <CommentOutlined />,
  },
  {
    label: 'Price',
    key: '/price',
    icon: <UnorderedListOutlined />,
  },
  {
    label: 'Profile',
    key: '/user/profile',
    icon: <IdcardOutlined />,
  },
  {
    label: 'Admin',
    key: 'admin',
    type: 'group',
    icon: <SafetyOutlined />,
    children: [
      {
        label: 'Users',
        key: '/admin/users',
        icon: <UserOutlined />,
      },
      {
        label: 'Analyze',
        key: '/admin/analyze',
        icon: <AreaChartOutlined />,
      },
    ]
  },
  {
    label: 'Log Out',
    key: '/auth/logout',
    icon: <LockOutlined />,
  },
];

function AuthLayout({
  children
}) {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const handleClick = ({ item, key }) => {
    if (key === '/auth/logout') {
      dispatch(logout());
    } else {
      navigate(key);
    }
  }

  return (
    <Layout className='min-h-screen'>
      <Header className='bg-white flex items-center justify-between px-[20px]'>
        <div className="demo-logo h-[64px] bg-white mb-2">
          <Link to="/" className='hidden sm:inline' ><img src={LogoSrc} alt="logo" className='w-[200px] p-3' /></Link>
          <Link to="/" className='inline sm:hidden'><img src={smLogoSrc} alt="logo" className='w-[64px] p-3' /></Link>
        </div>
        <div>
          <Dropdown
            menu={{
              items: items.filter(item => item.key != 'admin' || (item.key == 'admin' && user.isAdmin)),
              onClick: handleClick,
            }}
            trigger='click'
            placement="bottom"
            arrow
          >
            <Button type='primary' size='large' icon={<UserOutlined />}>{user.name}</Button>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        {children}
      </Layout>
    </Layout>
  )
}

export default AuthLayout;