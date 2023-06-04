import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";

import './App.css';
import store from './redux/store';
import PublicRoute from './container/routes/PublicRoute';
import PrivateRoute from './container/routes/PrivateRoute';
import ProtectedRoutes from './container/routes/ProtectedRoutes';
import Login from './container/pages/Auth/Login';
import Register from './container/pages/Auth/Register';
import { getStorage } from './helpers';
import { getUser } from './redux/auth/authSlice';

const storeProvider = store();

function App() {
  return (
    <Provider store={storeProvider}>
      <Router>
        <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center bg-gray-500'>
          <HashLoader
            color="#eee"
            loading
            size={80}
            speedMultiplier={1}
          />
        </div>}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route exact path='auth/login' element={<Login />} />
              <Route exact path='auth/register' element={<Register />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/*" element={<ProtectedRoutes />} />
            </Route>
            <Route exact path='/' element={<Navigate to='auth/login' />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
