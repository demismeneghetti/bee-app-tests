"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ element: Component }) => {
  const router = useRouter();
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return <Component />;
};

export default PrivateRoute;
