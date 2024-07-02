import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authservice";

const AuthenticatedRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};
const RedirectIfAuthenticated = ({ children }) => {
  const isAuth = isAuthenticated(); 
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};
export {AuthenticatedRoute,RedirectIfAuthenticated};
