import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== role) {
      return <Navigate to="/" replace />;
    }
  }
  return children;
}

export default ProtectedRoute;