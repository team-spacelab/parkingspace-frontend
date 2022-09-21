import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function AuthRoute({ authenticated }) {
  return authenticated ? <Outlet /> : <Navigate to={{ pathname: "/login"}} />
}

export default AuthRoute;
