import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LoginForm from "./auth/LoginForm";
import LogoutButton from "./auth/LogoutButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomNavbar = ({ isLoggedIn, handleLogout, handleLogin }) => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <strong style={{ fontSize: "24px" }}>Meme Game</strong>
          </Navbar.Brand>
          {isLoggedIn ? (
            <>
              <Button variant="outline-primary">
                <i className="bi bi-person-fill"></i>
              </Button>
              <LogoutButton handleLogout={handleLogout} />
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
};

export default CustomNavbar;
