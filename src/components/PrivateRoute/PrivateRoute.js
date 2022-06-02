import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  if (token !== 'chungtalaluquyotanrungsauotannuicao') {
    return <Navigate to={'/sign-in'} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateRoute;