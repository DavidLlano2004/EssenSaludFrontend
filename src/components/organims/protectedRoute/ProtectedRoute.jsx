import React from "react";
import { useUIContext } from "../../../context/UIContext";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const {
    auth: { isLogged },
  } = useSelector((state) => state.persistedData);

  const { loading } = useUIContext();

  console.log(isLogged);
  
  if (loading) return <h1>Cargando...</h1>;
  if (!isLogged) return <Navigate to="/" replace />;
  return <Outlet />;
};
