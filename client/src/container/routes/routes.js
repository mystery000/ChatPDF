import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('../pages/Home/Home')),
    exact: true,
  },
  {
    path: 'price',
    component: lazy(() => import('../pages/Price/Lists')),
    exact: true,
  },
  {
    path: 'user/profile',
    component: lazy(() => import('../pages/Profile/Edit')),
    exact: true,
  },
  {
    path: 'admin/users',
    component: lazy(() => import('../pages/Admin/Users')),
    exact: true,
  },
];

export default routes;
