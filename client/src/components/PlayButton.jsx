import { Button } from "react-bootstrap";
import { useState } from "react";
import "./PlayButton.css";

const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState({ msg: "", type: "" });

  const handlePlay = async () => {
    await API.play();
    setIsPlaying(true);
    setMessage({ msg: "Game started!", type: "success" });
  };

  return (
    <Button size="huge" onClick={handlePlay}>
      PLAY
    </Button>
  );
};

export default PlayButton;
