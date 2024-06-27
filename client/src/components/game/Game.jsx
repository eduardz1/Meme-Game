import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API.mjs";
import LoggedInContext from "../contexts/LoggedInContext";
import MessageContext from "../contexts/message/MessageContext";
import EndScreen from "./EndScreen";
import Round from "./Round";

/**
 * Game component that renders either the round or the end screen and contacts
 * the API to record the game. Also manages the logic to end each round
 */
const Game = ({ memes, setMemes }) => {
  const navigate = useNavigate();
  const { setError } = useContext(MessageContext);
  const isLoggedIn = useContext(LoggedInContext);
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);

  /**
   * Ends game by recording the result through the API and navigating back to home
   *
   * @param {Array.<{number, number, number, string, string}>} rounds the rounds
   *  played by the user
   */
  const endGame = async () => {
    // Filter out unnecessary fields
    const cleanedUpRounds = rounds.map((round) => {
      const { idMeme, idCaption, score } = round;
      return { idMeme, idCaption, score };
    });

    try {
      if (isLoggedIn) await API.recordGame(cleanedUpRounds);

      navigate("/");
      setMemes([]);
    } catch (error) {
      setError(error);
    }
  };

  /**
   * End round by recording the result and moving to the next round
   */
  const endRound = ({ idMeme, idCaption, score, tag, caption }) => {
    setRounds([...rounds, { idMeme, idCaption, score, tag, caption }]);
    setCurrentRound(currentRound + 1);
  };

  return (
    <>
      {currentRound < memes.length ? (
        <div style={{ paddingTop: "20px" }}>
          <Round
            endRound={endRound}
            meme={memes[currentRound]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              overflow: "auto",
              paddingTop: "100px",
            }}
          />
        </div>
      ) : (
        <EndScreen endGame={endGame} rounds={rounds} />
      )}
    </>
  );
};

Game.propTypes = {
  memes: PropTypes.array.isRequired,
  setMemes: PropTypes.func.isRequired,
};

export default Game;
