import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";

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
    const imageNumber = Math.floor(Math.random() * NUM_REACTION_IMAGES) + 1; // generates a random number between 1 and 10
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
    </>
  );
};

EndScreen.propTypes = {
  setConfirmed: PropTypes.func.isRequired,
  rounds: PropTypes.array.isRequired,
};

export default EndScreen;
