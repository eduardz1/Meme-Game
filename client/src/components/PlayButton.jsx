import { Button } from "react-bootstrap";
import { useState } from "react";

const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState({ msg: "", type: "" });

  const handlePlay = async () => {
    await API.play();
    setIsPlaying(true);
    setMessage({ msg: "Game started!", type: "success" });
  };

  return (
    <>
      <style>{`
        .btn-huge {
          padding: 1rem 5rem;
          font-size: 5rem;
          letter-spacing: 0.2rem;
          font-weight: bold;
        }
      `}</style>

      <Button size="huge" onClick={handlePlay}>
        PLAY
      </Button>
    </>
  );
};

export default PlayButton;
