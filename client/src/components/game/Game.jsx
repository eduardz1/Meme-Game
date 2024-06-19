import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Round from "./Round";

const Game = ({ memes, endGame }) => {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    if (currentRound === memes.length) {
      endGame(rounds);
    }
  }, [currentRound]);

  const endRound = ({ idMeme, idCaption, score }) => {
    setRounds([...rounds, { idMeme, idCaption, score }]);
    setCurrentRound(currentRound + 1);
  };

  return (
    <>
      {currentRound < memes.length && (
        <Round endRound={endRound} meme={memes[currentRound]} />
      )}
    </>
  );
};

Game.propTypes = {
  memes: PropTypes.array.isRequired,
  endGame: PropTypes.func.isRequired,
};

export default Game;
