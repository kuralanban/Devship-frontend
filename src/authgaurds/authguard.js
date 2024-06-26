import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../services/authservice";

const AuthenticatedRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  useEffect(() => {
    if (!isAuth) {
      Navigate("/login");
    }
  }, [isAuth]);

  return isAuth ? children : <Outlet />;
};

export default AuthenticatedRoute;