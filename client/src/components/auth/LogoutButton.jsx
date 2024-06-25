import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";

/**
 * A button that logs the user out. Handles only the click event, not the API call.
 */
const LogoutButton = ({ handleLogout }) => {
  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

LogoutButton.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
