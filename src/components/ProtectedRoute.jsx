import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { loggedIn } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      element={loggedIn ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
