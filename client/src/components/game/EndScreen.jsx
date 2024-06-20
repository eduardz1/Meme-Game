import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const NUM_REACTION_IMAGES = 4;

const EndScreen = ({ setConfirmed, rounds }) => {
  const [show, setShow] = useState(true);
  const [reactionImage, setReactionImage] = useState("");

  useEffect(() => {
    setReactionImage(getReaction());
  }, []);

  // Logged in users play more rounds so we have to calculate a percentage
  const getCorrectPercentage = () => {
    const correct = rounds.filter((round) => round.score > 0);
    return (correct.length / rounds.length) * 100;
  };

  const getRandomImage = (folder) => {
    const imageNumber = Math.floor(Math.random() * NUM_REACTION_IMAGES) + 1;
    return `reactions/${folder}/${imageNumber}.gif`;
  };

  const getReaction = () => {
    const correctPercentage = getCorrectPercentage();
    if (correctPercentage === 100) {
      return getRandomImage("100");
    } else if (correctPercentage >= 50) {
      return getRandomImage("50-99");
    } else if (correctPercentage > 0) {
      return getRandomImage("1-49");
    } else {
      return getRandomImage("0");
    }
  };

  const getScore = () => {
    return rounds.reduce((acc, round) => acc + round.score, 0);
  };

  return (
    <>
      <Container fluid="md" style={{ paddingTop: "20px" }}>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Your Score: {getScore()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image
              src={reactionImage}
              alt="reaction image"
              rounded
              className="img-fluid w-100"
            />
            {!!getScore() && (
              <Card className="mt-3" bg="success" text="light">
                <Card.Header className="text-center">
                  <h3>Correctly guessed captions</h3>
                </Card.Header>
                <Card.Body className="text-center">
                  {rounds.map(
                    (round, index) =>
                      round.score != 0 && (
                        <Row
                          key={index}
                          className="d-flex align-items-center mt-3"
                        >
                          <Col
                            style={{
                              position: "relative",
                              display: "inline-flex",
                            }}
                          >
                            <Image
                              src={`memes/${round.tag}`}
                              alt={round.tag.split(".")[0].replace(/-/g, " ")}
                              rounded
                              className="img-fluid w-100"
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                padding: "10px 10px 10px 10px",
                                fontFamily: "Impact",
                                textTransform: "uppercase",
                                fontSize: "1.5rem",
                                color: "white",
                                textAlign: "center",
                                width: "95%",
                                textShadow:
                                  "-2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black, 2px 2px 0px black",
                              }}
                            >
                              {round.caption || <i>No caption selected</i>}
                            </div>
                          </Col>
                        </Row>
                      )
                  )}
                </Card.Body>
              </Card>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShow(false);

                setTimeout(() => {
                  setConfirmed(true);
                }, 300);
              }}
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

EndScreen.propTypes = {
  setConfirmed: PropTypes.func.isRequired,
  rounds: PropTypes.array.isRequired,
};

export default EndScreen;
