import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";

const POINTS_CORRECT_GUESS = 5;
const POINTS_INCORRECT_GUESS = 0;

const Round = ({ endRound, meme }) => {
  const [clickedButton, setClickedButton] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleClick = (index, isCorrectGuess) => {
    setClickedButton(index);
    setIsCorrect(isCorrectGuess);
    setTimeout(() => {
      endRound({
        idMeme: meme.id,
        idCaption: meme.captions[index].id,
        score: isCorrectGuess ? POINTS_CORRECT_GUESS : POINTS_INCORRECT_GUESS,
      });
    }, 1000);
  };

  useEffect(() => {
    setClickedButton(null);
  }, [meme]);

  return (
    <>
      <Container fluid="lg">
        <div style={{ display: "inline-block" }}>
          <Row className="mb-3">
            <Col>
              <Image
                src={`memes/${meme.tag}`}
                alt={meme.tag.split(".")[0].replace(/-/g, " ")}
                rounded
                fluid
                style={{ minHeight: "50vh", maxHeight: "70vh" }}
              />
            </Col>
          </Row>
          {meme.captions.map((caption, index) => (
            <Row key={index} className="mb-3">
              <Col>
                <style>{`
                    .btn-danger {
                        transition: all 0.5s ease;
                        animation: shake 0.5s forwards;
                    }

                    .btn:active {
                        transform: scale(0.9);
                        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
                    }

                    @keyframes shake {
                        0% { transform: translate(1px, 1px) rotate(0deg); }
                        10% { transform: translate(-1px, -2px) rotate(-1deg); }
                        20% { transform: translate(-3px, 0px) rotate(1deg); }
                        30% { transform: translate(3px, 2px) rotate(0deg); }
                        40% { transform: translate(1px, -1px) rotate(1deg); }
                        50% { transform: translate(-1px, 2px) rotate(-1deg); }
                        60% { transform: translate(-3px, 1px) rotate(0deg); }
                        70% { transform: translate(3px, 1px) rotate(-1deg); }
                        80% { transform: translate(-1px, -1px) rotate(1deg); }
                        90% { transform: translate(1px, 2px) rotate(0deg); }
                        100% { transform: translate(1px, -2px) rotate(-1deg); }
                    }
                `}</style>
                <Button
                  variant={
                    clickedButton === index
                      ? isCorrect
                        ? "success"
                        : "danger"
                      : "light"
                  }
                  size="lg"
                  className="w-100"
                  style={{
                    fontFamily: "Impact",
                    textTransform: "uppercase",
                    fontSize: "2rem",
                    color: "white",
                    textShadow:
                      "-2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black, 2px 2px 0px black",
                  }}
                  onClick={() => handleClick(index, caption.isCorrect)}
                >
                  {caption.caption}
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      </Container>
    </>
  );
};

Round.propTypes = {
  endRound: PropTypes.func.isRequired,
  meme: PropTypes.object.isRequired,
};

export default Round;
