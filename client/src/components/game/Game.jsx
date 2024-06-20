import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Round from "./Round";
import EndScreen from "./EndScreen";

const Game = ({ memes, endGame }) => {
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isConfirmed, setConfirmed] = useState(false);

  useEffect(() => {
    // Filter out unnecessary fields
    const cleanedUpRounds = rounds.map((round) => {
      const { idMeme, idCaption, score, tag, caption } = round;
      return { idMeme, idCaption, score };
    });

    if (isConfirmed) endGame(cleanedUpRounds);
  }, [isConfirmed]);

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
