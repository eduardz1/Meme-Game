import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <strong style={{ fontSize: "24px" }}>Meme Game</strong>
        </Navbar.Brand>
        <Form inline className="ml-auto">
          <InputGroup>
            <Form.Control type="text" placeholder="email" className="mr-sm-2" />
            <Form.Control
              type="password"
              placeholder="password"
              className="mr-sm-2"
            />
            <Button variant="outline-primary">Login</Button>
          </InputGroup>
        </Form>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
