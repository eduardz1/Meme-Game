import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";

/**
 * Component used to protect routes that require the user to be logged in.
 */
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
