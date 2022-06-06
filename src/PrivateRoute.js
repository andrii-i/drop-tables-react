import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';

export default function PrivateRoute() {
  const { currentUser } = useAuth();
  console.log('in private route user- ', currentUser);
  return (
    currentUser ? <Outlet /> : <Navigate to='/login' />
  );
}