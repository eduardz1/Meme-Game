import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

/**
 * A form for logging in. handles only the data, not the API call.
 */
const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <Form className="ml-auto" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          id="email"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mr-sm-2"
          autoComplete="email"
        />
        <Form.Control
          id="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mr-sm-2"
          autoComplete="current-password"
        />
        <Button aria-label="Login" variant="outline-primary" type="submit">
          Login
        </Button>
      </InputGroup>
    </Form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
