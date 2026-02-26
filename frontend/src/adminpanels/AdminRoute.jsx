import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Check if user exists and has admin role
    // Note: In a real app, you should also verify the token with the backend
    if (!user || user.role !== 'admin') {
        return <Navigate to="/admin/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default AdminRoute;
