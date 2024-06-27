import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import API from "../../api/API.mjs";
import LoggedInContext from "../contexts/LoggedInContext";
import MessageContext from "../contexts/message/MessageContext";
import styles from "./Animations.module.css";

/**
 * Button that starts the game by fetching memes and captions from the API
 */
const PlayButton = ({ setMemes }) => {
  const [isActive, setIsActive] = useState(false);

  const baseStyle = {
    padding: "1rem 5rem",
    fontSize: "5rem",
    letterSpacing: "0.2rem",
    fontWeight: "bold",
    borderRadius: "2rem",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
  };

  const activeStyle = {
    transform: "scale(0.9)",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  };

  const combinedStyle = isActive ? { ...baseStyle, ...activeStyle } : baseStyle;

  const navigate = useNavigate();
  const { setError } = useContext(MessageContext);
  const isLoggedIn = useContext(LoggedInContext);

  /**
   * Fetch memes and captions from the API and start the game by navigating to
   * the play screen
   */
  const startGame = async () => {
    try {
      let memes = await API.getRandomMemes(
        isLoggedIn
          ? parseInt(import.meta.env.VITE_NUM_MEMES_LOGGED_IN)
          : parseInt(import.meta.env.VITE_NUM_MEMES_NOT_LOGGED_IN),
      );

      const updatedMemes = await Promise.all(
        memes.map(async (meme) => {
          const captions = await API.getRandomCaptionsForMeme(meme.id);

          const updatedCaptions = captions.map((caption) => ({
            ...caption,
            isCorrect: false,
          }));

          return {
            ...meme,
            captions: [...updatedCaptions],
          };
        }),
      );

      setMemes(updatedMemes);

      setTimeout(() => {
        navigate("/play");
      }, 50); // Makes it feel a bit better
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Button
        aria-label="Play"
        variant="light"
        onClick={startGame}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
        style={combinedStyle}
        className={styles.fadeInAnimation}
      >
        PLAY
      </Button>
      <svg
        alt="Is this a play button?"
        className={styles.slowFadeInAnimation}
        viewBox="0 0 400 225"
        style={{
          position: "absolute",
          left: "-95%",
          pointerEvents: "none",
          width: "500px",
        }}
      >
        <image
          href="./is-this-a-play-button.png"
          x="0"
          y="0"
          height="200px"
          width="500px"
        />
        <text
          x="35%"
          y="99%"
          fontFamily="Impact"
          fontSize="20"
          fill="white"
          stroke="black"
          strokeWidth="1"
        >
          IS THIS A PLAY BUTTON?
        </text>
      </svg>
    </div>
  );
};

PlayButton.propTypes = {
  setMemes: PropTypes.func.isRequired,
};

export default PlayButton;
