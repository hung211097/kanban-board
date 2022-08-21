import { Navigate } from "react-router-dom";
import React from "react";
import PAGES from "./constants";
import { getToken } from "services/storages/userStorage";

const PrivateRoutes = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to={PAGES.login} />;
  }
  return children;
};

export default PrivateRoutes;
