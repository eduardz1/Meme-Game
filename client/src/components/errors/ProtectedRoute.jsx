import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoggedInContext from "../contexts/LoggedInContext";
import { useContext } from "react";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useContext(LoggedInContext);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
