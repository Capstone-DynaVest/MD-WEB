import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Cek jika token ada di localStorage (menandakan pengguna sudah login)
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Arahkan ke halaman login jika belum login
  }

  return element;
};

export default PrivateRoute;
