// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/login" />; // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  }

  if (role !== allowedRole) {
    return <Navigate to="/" />; // Chuyển hướng đến trang chủ nếu vai trò không đúng
  }

  return <Outlet />; // Cho phép truy cập nếu vai trò đúng
};

export default ProtectedRoute;


