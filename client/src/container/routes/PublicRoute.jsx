import React from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

function PublicRoute() {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  return !isAuthenticated ? <Outlet /> : <Navigate to='/home' />
}

export default PublicRoute;