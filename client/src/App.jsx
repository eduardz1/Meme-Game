import { useEffect } from "react";
import { useState } from "react";
import CustomNavbar from "./components/CustomNavbar";
import API from "./api/API.mjs";
import PlayButton from "./components/game/PlayButton";
import Game from "./components/game/Game";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./components/user/Profile";
import ErrorPage from "./components/errors/Error404Page";
import ErrorBoundary from "./components/errors/ErrorBoundary";

const NUM_MEMES_LOGGED_IN = 3;
const NUM_MEMES_NOT_LOGGED_IN = 1;
const NUM_CORRECT_CAPTIONS = 2;
const NUM_INCORRECT_CAPTIONS = 5;

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [memes, setMemes] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ msg: "", type: "" });

  const navigate = useNavigate();

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
        navigate("/play");
      }, 50); // Makes it feel a bit better
    } catch (error) {
      setMessage({ msg: error.message, type: "danger" });
    }
  };

  const endGame = async (rounds) => {
    try {
      if (isLoggedIn) await API.recordGame(user.id, rounds);

      navigate("/");
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
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={<PlayButton onStartGame={startGame} />}
          ></Route>
          <Route
            path="play"
            element={<Game memes={memes} endGame={endGame} />}
          ></Route>
          <Route path="profile" element={<Profile user={user} />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
