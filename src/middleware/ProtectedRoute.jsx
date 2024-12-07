import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const isAuthenticated = () => {
  const token = useSelector((state)=>state.user); 
//   console.log(token);
  
  return !!token; 
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
