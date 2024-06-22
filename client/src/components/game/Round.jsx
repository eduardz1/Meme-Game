import PropTypes from "prop-types";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import MessageContext from "../contexts/MessageContext.jsx";
import Timer from "./Timer";
import API from "../../api/API.mjs";

const POINTS_CORRECT_GUESS = 5;
const POINTS_INCORRECT_GUESS = 0;

const Round = ({ endRound, meme }) => {
  const { setInfo, setWarning, setError } = useContext(MessageContext);

  const [clickedButton, setClickedButton] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // Used to avoid showing the captions a split second before the image
  const [imageLoaded, setImageLoaded] = useState(false);

  // Update all the captions except for the one we already know the truthiness of
  const fetchCaptionsInfo = async (index) => {
    try {
      for (let i = 0; i < meme.captions.length; i++) {
        if (i === index) continue;

        const isCorrectGuess = await API.validateCaption(
          meme.captions[i].id,
          meme.id
        );

        meme.captions[i].isCorrect = isCorrectGuess;
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleClick = async (index) => {
    try {
      let isCorrectGuess = false;
      if (index === null) {
        setWarning("Time's up! ⏰");
      } else {
        isCorrectGuess = await API.validateCaption(
          meme.captions[index].id,
          meme.id
        );

        setIsCorrect(isCorrectGuess);
        isCorrectGuess ? setInfo("Correct! 😃") : setWarning("Incorrect! 😖");
      }

      await fetchCaptionsInfo(index);
      setClickedButton(index === null ? -1 : index);

      // Wait a second before ending the round so the user can see the result
      setTimeout(() => {
        endRound({
          idMeme: meme.id,
          score: isCorrectGuess ? POINTS_CORRECT_GUESS : POINTS_INCORRECT_GUESS,
          tag: meme.tag,
          idCaption: index === null ? null : meme.captions[index].id,
          caption: index === null ? null : meme.captions[index].caption,
        });
      }, 1000);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setClickedButton(null);
  }, [meme]);

  return (
    <Col lg={8} className="mx-auto">
      <Container fluid="md">
        <Row className="mb-3">
          <Col
            style={{
              position: "relative",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                padding: "20px 40px 0 0",
              }}
            >
              <Timer handleClick={handleClick} />
            </div>
            <Image
              src={`memes/${meme.tag}`}
              alt={meme.tag.split(".")[0].replace(/-/g, " ")}
              rounded
              className="img-fluid w-100"
              onLoad={() => setImageLoaded(true)}
            />
          </Col>
        </Row>
        {imageLoaded &&
          meme.captions.map((caption, index) => (
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
                    // If the button has been clicked, show the success or
                    // danger variant based on whether the caption is correct.
                    // If a button has been clicked and it was the incorrect
                    // one, show the success variants for the correct captions.
                    clickedButton === index
                      ? isCorrect
                        ? "success"
                        : "danger"
                      : clickedButton !== null &&
                          caption.isCorrect &&
                          !isCorrect
                        ? "success"
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
                  onClick={() => handleClick(index)}
                >
                  {caption.caption}
                </Button>
              </Col>
            </Row>
          ))}
      </Container>
    </Col>
  );
};

Round.propTypes = {
  endRound: PropTypes.func.isRequired,
  meme: PropTypes.object.isRequired,
};

export default Round;
