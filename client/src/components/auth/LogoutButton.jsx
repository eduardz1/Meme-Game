import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

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
