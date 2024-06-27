import { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

const PEDRO = "/racoon-pedro.gif";

/**
 * A fun 404 error page.
 */
const ErrorPage = () => {
  const [imgSize, setImgSize] = useState(0);
  const imgRef = useRef(null);

  // Just for fun :)
  useEffect(() => {
    const updateSize = () => {
      if (imgRef.current) {
        setImgSize(imgRef.current.offsetHeight || 300);
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Container>
      <Row xs={3} className="d-flex align-items-center">
        <Col className="text-center">
          <div style={{ fontSize: `${imgSize}px` }}>4</div>
        </Col>
        <Col>
          <Image
            ref={imgRef}
            src={PEDRO}
            roundedCircle
            fluid
            alt="Racoon"
          ></Image>
        </Col>
        <Col className="text-center">
          <div style={{ fontSize: `${imgSize}px` }}>4</div>
        </Col>
      </Row>
      <Row className="text-center">
        <h1>The page you are looking for does not exist.</h1>
      </Row>
    </Container>
  );
};

export default ErrorPage;
