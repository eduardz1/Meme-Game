import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PlayButton = ({ onStartGame }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

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
          outline: none;
          border: none;
        }

        .btn-play-button:focus {
          outline: none;
          border: none;
        }
      `}</style>

      <Button variant="play-button" onClick={onStartGame}>
        PLAY
      </Button>
    </div>
  );
};

PlayButton.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default PlayButton;
