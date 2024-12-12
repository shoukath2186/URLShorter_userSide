import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


function RedirectRouter() {
    const isAuthenticated = useSelector((state) => !!state.user); 

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default RedirectRouter