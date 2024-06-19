import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PlayButton = ({ onStartGame }) => {
  return (
    <>
      <style>{`
        .btn-play-button {
          padding: 1rem 5rem;
          font-size: 5rem;
          letter-spacing: 0.2rem;
          font-weight: bold;
          border-radius: 2rem;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .btn-play-button:active {
          transform: scale(0.9);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <Button variant="play-button" onClick={onStartGame}>
        PLAY
      </Button>
    </>
  );
};

PlayButton.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default PlayButton;
