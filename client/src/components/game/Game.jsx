import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import MessageContext from "../contexts/MessageContext";
import Round from "./Round";
import React from "react";
import EndScreen from "./EndScreen";
import { useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";
import API from "../../api/API.mjs";

const Game = ({ memes, setMemes }) => {
  const navigate = useNavigate();

  const { setError } = useContext(MessageContext);

  const isLoggedIn = useContext(LoggedInContext);

  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isConfirmed, setConfirmed] = useState(false);

  const endGame = async (rounds) => {
    try {
      if (isLoggedIn) await API.recordGame(rounds);

      navigate("/");
      setMemes([]);
    } catch (error) {
      setError(error);
    }
  };

  const endRound = ({ idMeme, idCaption, score, tag, caption }) => {
    setRounds([...rounds, { idMeme, idCaption, score, tag, caption }]);
    setCurrentRound(currentRound + 1);
  };

  useEffect(() => {
    // Filter out unnecessary fields
    const cleanedUpRounds = rounds.map((round) => {
      const { idMeme, idCaption, score } = round;
      return { idMeme, idCaption, score };
    });

    if (isConfirmed) endGame(cleanedUpRounds);
  }, [isConfirmed]);

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
        <EndScreen setConfirmed={setConfirmed} rounds={rounds} />
      )}
    </>
  );
};

Game.propTypes = {
  memes: PropTypes.array.isRequired,
  setMemes: PropTypes.func.isRequired,
};

export default Game;
