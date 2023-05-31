import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import routes from './routes';

function ProtectedRoutes() {

  return (
    <AuthLayout>
      <Routes>
        {routes.map(({ component: Component, path, exact }, index) => (
          <Route path={`${path}`} key={index} exact={exact} element={<Component />} />
        ))}
      </Routes>
    </AuthLayout>
  );
}

export default ProtectedRoutes;
