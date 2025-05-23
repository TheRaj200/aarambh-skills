import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Example authentication check

  return isAuthenticated ? (
    React.createElement(Component, rest)
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;