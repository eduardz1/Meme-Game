import { useEffect } from "react";
import { useState } from "react";
import CustomNavbar from "./components/CustomNavbar";
import API from "./api/API.mjs";
import PlayButton from "./components/PlayButton";
import Game from "./components/game/Game";

const NUM_MEMES_LOGGED_IN = 3;
const NUM_MEMES_NOT_LOGGED_IN = 1;
const NUM_CORRECT_CAPTIONS = 2;
const NUM_INCORRECT_CAPTIONS = 5;

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [memes, setMemes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ msg: "", type: "" });

  const handleLogin = async (email, password) => {
    try {
      const user = await API.login(email, password);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: "success" });
      setUser(user);
    } catch (error) {
      setMessage({ msg: error, type: "danger" });
    }
  };

  const handleLogout = async () => {
    await API.logout();
    setLoggedIn(false);
    setUser(null);
    setMessage({ msg: "You have been logged out.", type: "success" });
  };

  const startGame = async () => {
    try {
      let memes = await API.getRandomMemes(
        isLoggedIn ? NUM_MEMES_LOGGED_IN : NUM_MEMES_NOT_LOGGED_IN
      );

      const updatedMemes = await Promise.all(
        memes.map(async (meme) => {
          const correctCaptions = await API.getCorrectCaptions(
            meme.id,
            NUM_CORRECT_CAPTIONS
          );

          const updatedCorrectCaptions = correctCaptions.map((caption) => ({
            ...caption,
            isCorrect: true,
          }));

          const incorrectCaptions = await API.getIncorrectCaptions(
            meme.id,
            NUM_INCORRECT_CAPTIONS
          );

          const updatedIncorrectCaptions = incorrectCaptions.map((caption) => ({
            ...caption,
            isCorrect: false,
          }));

          return {
            ...meme,
            captions: [
              ...updatedCorrectCaptions,
              ...updatedIncorrectCaptions,
            ].sort(() => Math.random() - 0.5),
          };
        })
      );

      setMemes(updatedMemes);

      setTimeout(() => {
        setIsPlaying(true);
      }, 50); // Makes it feel a bit better
    } catch (error) {
      setMessage({ msg: error.message, type: "danger" });
    }
  };

  const endGame = async (rounds) => {
    try {
      if (isLoggedIn) await API.recordGame(user.id, rounds);

      setIsPlaying(false);
      setMemes([]);
    } catch (error) {
      setMessage({ msg: error.message, type: "danger" });
    }
  };

  const setFeedbackFromError = (err) => {
    let message = "";
    if (err.message) message = err.message;
    else message = "Unknown Error";
    setMessage({ msg: message, type: "danger" }); // Assuming only one error message at a time
  };

  useEffect(() => {
    console.log(memes);
  }, [memes]);

  useEffect(() => {
    API.getUserInfo()
      .then((user) => {
        setLoggedIn(true);
        setUser(user);
      })
      .catch((error) => {
        if (isLoggedIn) setFeedbackFromError(error);

        setLoggedIn(false);
        setUser(null);
      });
  }, []);

  return (
    <div>
      <CustomNavbar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isPlaying ? (
          <Game memes={memes} isPlaying={isPlaying} endGame={endGame} />
        ) : (
          <div style={{ transform: "translateY(-120%)" }}>
            <PlayButton onStartGame={startGame} isPlaying={isPlaying} />
          </div>
        )}

        <p
          style={{
            position: "absolute",
            bottom: 0,
            color: message.type === "danger" ? "red" : "green",
          }}
        >
          {message.msg}
        </p>
      </div>
    </div>
  );
};

export default App;
