import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Round from "./Round";
import EndScreen from "./EndScreen";

const Game = ({ memes, endGame }) => {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isConfirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (isConfirmed) endGame(rounds);
  }, [isConfirmed]);

  const endRound = ({ idMeme, idCaption, score }) => {
    setRounds([...rounds, { idMeme, idCaption, score }]);
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
        <EndScreen setConfirmed={setConfirmed} rounds={rounds} />
      )}
    </>
  );
};

Game.propTypes = {
  memes: PropTypes.array.isRequired,
  endGame: PropTypes.func.isRequired,
};

export default Game;
