import "bootstrap-icons/font/bootstrap-icons.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import LoginForm from "./auth/LoginForm";
import LogoutButton from "./auth/LogoutButton";
import LoggedInContext from "./contexts/LoggedInContext";

/**
 * Navbar component that displays the logo and the login/logout buttons.
 */
const CustomNavbar = ({ handleLogout, handleLogin, fetchUserInfo }) => {
  const isLoggedIn = useContext(LoggedInContext);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Image
              alt="Logo"
              height={50}
              src="favicon.ico"
              style={{ marginTop: "-20px", marginRight: "5px" }}
            />
            <Navbar.Brand>
              <strong style={{ fontSize: "30px" }}>Meme Game</strong>
            </Navbar.Brand>
          </Link>
          {isLoggedIn ? (
            <div className="mt-3">
              <ButtonToolbar>
                <ButtonGroup className="me-2" aria-label="User profile">
                  <Link to="/profile">
                    <Button
                      aria-label="Profile"
                      variant="outline-primary"
                      onClick={fetchUserInfo}
                    >
                      <i className="bi bi-person-fill"></i>
                    </Button>
                  </Link>
                </ButtonGroup>
                <ButtonGroup aria-label="Logout button">
                  <LogoutButton handleLogout={handleLogout} />
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          ) : (
            <div className="mt-3">
              <LoginForm handleLogin={handleLogin} />
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

CustomNavbar.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
};

export default CustomNavbar;
