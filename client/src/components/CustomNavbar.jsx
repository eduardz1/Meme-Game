import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LoginForm from "./auth/LoginForm";
import LogoutButton from "./auth/LogoutButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const CustomNavbar = ({
  isLoggedIn,
  handleLogout,
  handleLogin,
  fetchUserInfo,
}) => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Image
              height={50}
              src="favicon.ico"
              style={{ marginTop: "-20px", marginRight: "5px" }}
            />
            <Navbar.Brand>
              <strong style={{ fontSize: "30px" }}>Meme Game</strong>
            </Navbar.Brand>
          </Link>
          {isLoggedIn ? (
            <>
              <ButtonToolbar>
                <ButtonGroup className="me-2" aria-label="User profile">
                  <Link to="/profile">
                    <Button variant="outline-primary" onClick={fetchUserInfo}>
                      <i className="bi bi-person-fill"></i>
                    </Button>
                  </Link>
                </ButtonGroup>
                <ButtonGroup aria-label="Logout button">
                  <LogoutButton handleLogout={handleLogout} />
                </ButtonGroup>
              </ButtonToolbar>
            </>
          ) : (
            <LoginForm handleLogin={handleLogin} />
          )}
        </Container>
      </Navbar>
    </>
  );
};

CustomNavbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  fetchUserInfo: PropTypes.func.isRequired,
};

export default CustomNavbar;
