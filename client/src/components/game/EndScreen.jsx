import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import LoggedInContext from "../contexts/LoggedInContext";
import MemeCards from "../MemeCards";

/**
 * End screen of the game with the total score and a summary of the correctly
 * selected memes
 */
const EndScreen = ({ endGame, rounds }) => {
  const [show, setShow] = useState(true);
  const [reactionImage, setReactionImage] = useState("");
  const isLoggedIn = useContext(LoggedInContext);

  useEffect(() => {
    setReactionImage(getReaction());
  }, []);

  /**
   * Get percentage of correct guesses. Logged in users play more rounds so
   * we have to calculate a percentage to decide if the user did good or bad.
   */
  const getCorrectPercentage = () => {
    const correct = rounds.filter((round) => round.score > 0);
    return (correct.length / rounds.length) * 100;
  };

  /**
   * Get a random image from a folder populated with
   * images encoded as "[1-VITE_NUM_REACTION_IMAGES].gif"
   *
   * @param {string} folder folder to scan for images
   * @returns path of the randomly chosen image
   */
  const getRandomImage = (folder) => {
    const imageNumber =
      Math.floor(
        Math.random() * parseInt(import.meta.env.VITE_NUM_REACTION_IMAGES),
      ) + 1;
    return `reactions/${folder}/${imageNumber}.gif`;
  };

  /**
   * Get a reaction image based on the percentage of correct guesses
   */
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
              <Accordion className="mt-3" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="text-center">
                    <h3>Correctly guessed captions</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <MemeCards
                      rounds={rounds.filter((round) => round.score !== 0)}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              aria-label={isLoggedIn ? "Save" : "Continue"}
              variant="primary"
              onClick={() => {
                setShow(false);

                // Wait for the modal closing animation to finish
                setTimeout(() => endGame(), 300);
              }}
            >
              {isLoggedIn ? "Save" : "Continue"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

EndScreen.propTypes = {
  endGame: PropTypes.func.isRequired,
  rounds: PropTypes.array.isRequired,
};

export default EndScreen;
