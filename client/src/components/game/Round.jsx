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
import React from "react";
import API from "../../api/API.mjs";
import styles from "./Animations.module.css";

const Round = ({ endRound, meme }) => {
  const { setInfo, setWarning, setError } = useContext(MessageContext);
  const [isCorrect, setIsCorrect] = useState(null);

  // Used to avoid showing the captions a split second before the image
  const [imageLoaded, setImageLoaded] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);

  // Reset the clicked button when the meme changes
  useEffect(() => {
    setClickedButton(null);
  }, [meme]);

  // Get the variant for the button based on the current state, if the button
  // has been clicked, show the success or danger variant based on whether the
  // caption is correct. If a button has been clicked and it was the incorrect
  // one, show the success variants for the correct captions.
  const getButtonVariant = (index) => {
    if (clickedButton === index) return isCorrect ? "success" : "danger";

    if (clickedButton !== null && meme.captions[index].isCorrect && !isCorrect)
      return "success";

    return "light";
  };

  // If the button has been clicked and it was the incorrect one, add a shake,
  // otherwise add a press animation
  const getButtonClassName = (index) => {
    if (clickedButton === index)
      return isCorrect ? styles.pressAnimation : styles.shortShakeAnimation;

    return "";
  };

  // Update all the captions except for the one we already know the truthiness of
  const fetchCaptionsInfo = async (index) => {
    try {
      for (let i = 0; i < meme.captions.length; i++) {
        if (i === index) continue;

        const isCorrectGuess = await API.validateCaption(
          meme.captions[i].id,
          meme.id,
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
          meme.id,
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
          score: isCorrectGuess
            ? parseInt(import.meta.env.VITE_POINTS_CORRECT_GUESS)
            : parseInt(import.meta.env.VITE_POINTS_INCORRECT_GUESS),
          tag: meme.tag,
          idCaption: index === null ? null : meme.captions[index].id,
          caption: index === null ? null : meme.captions[index].caption,
        });
      }, 1000);
    } catch (error) {
      setError(error);
    }
  };

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
            {/* Overlay the timer to the meme */}
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
                <Button
                  variant={getButtonVariant(index)}
                  size="lg"
                  className={`w-100 ${getButtonClassName(index)}`}
                  style={{
                    fontFamily: "Impact",
                    textTransform: "uppercase",
                    fontSize: "2rem",
                    color: "white",
                    transition: "all 0.3s ease",
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
