import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown } from 'antd';
import { LockOutlined, UserOutlined, AreaChartOutlined, SafetyOutlined, IdcardOutlined, UnorderedListOutlined, CommentOutlined } from '@ant-design/icons';

import { logout } from '../../../redux/auth/authSlice';

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

const UserMenu = () => {

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
  )
};

export default UserMenu;
