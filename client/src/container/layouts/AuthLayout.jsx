import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Button, Dropdown } from 'antd';
import { LockOutlined, UserOutlined, AreaChartOutlined, SafetyOutlined, IdcardOutlined, UnorderedListOutlined, CommentOutlined } from '@ant-design/icons';

import LogoSrc from '../../assets/images/logo.png';
import { logout } from '../../redux/auth/authSlice';

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
    key: '/admin',
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
      <Header className='bg-white flex items-center justify-between'>
        <div className="demo-logo h-[64px] bg-white mb-2">
          <img src={LogoSrc} alt="logo" className='w-[200px] p-3' />
        </div>
        <div className='w-[200px]'>
          <Dropdown
            menu={{
              items,
              onClick: handleClick,
            }}
            trigger='click'
            placement="bottom"
            arrow
          >
            <Button type='primary' size='large' icon={<UserOutlined />}>{user.email}</Button>
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