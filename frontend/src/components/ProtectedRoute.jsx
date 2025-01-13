import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "../context/sessionContext";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSessionContext();
  if (loading) {
    return <div>loading...</div>;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
