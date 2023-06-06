import React from 'react';
import { Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import LogoSrc from '../../assets/images/logo.png';
import smLogoSrc from '../../assets/images/logo-sm.png';
import UserMenu from './partials/UserMenu';

const { Header } = Layout;

function AuthLayout({
  children
}) {
  const location = useLocation();
  return (
    <Layout className='min-h-screen'>
      {location.pathname != '/home' && <Header className='bg-white flex items-center justify-between px-[20px]'>
        <div className="demo-logo h-[64px] bg-white mb-2">
          <Link to="/" className='hidden sm:inline' ><img src={LogoSrc} alt="logo" className='w-[200px] p-3' /></Link>
          <Link to="/" className='inline sm:hidden'><img src={smLogoSrc} alt="logo" className='w-[64px] p-3' /></Link>
        </div>
        <div>
          <UserMenu />
        </div>
      </Header>}
      <Layout>
        {children}
      </Layout>
    </Layout >
  )
}

export default AuthLayout;