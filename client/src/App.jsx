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
import ProtectedRoute from "./components/errors/ProtectedRoute";
import MessageContext from "./components/contexts/MessageContext.jsx";
import useMessageContext from "./components/contexts/useMessageContext.mjs";
import MessageToast from "./components/MessageToast";

const NUM_MEMES_LOGGED_IN = 3;
const NUM_MEMES_NOT_LOGGED_IN = 1;

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [memes, setMemes] = useState([]);
  const [user, setUser] = useState(null);
  const { message, setError, setInfo, setWarning, setMessage } =
    useMessageContext();

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const user = await API.login(email, password);
      setLoggedIn(true);
      setUser(user);
      setInfo(`Welcome, ${user.name}!`);
    } catch (error) {
      setError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await API.logout();
      setLoggedIn(false);
      setUser(null);
      setInfo("You have been logged out.");
    } catch (error) {
      setError(error);
    }
  };

  const startGame = async () => {
    try {
      let memes = await API.getRandomMemes(
        isLoggedIn ? NUM_MEMES_LOGGED_IN : NUM_MEMES_NOT_LOGGED_IN
      );

      const updatedMemes = await Promise.all(
        memes.map(async (meme) => {
          const captions = await API.getRandomCaptionsForMeme(meme.id);

          const updatedCaptions = captions.map((caption) => ({
            ...caption,
            isCorrect: false,
          }));

          return {
            ...meme,
            captions: [...updatedCaptions],
          };
        })
      );

      setMemes(updatedMemes);

      setTimeout(() => {
        navigate("/play");
      }, 50); // Makes it feel a bit better
    } catch (error) {
      setError(error);
    }
  };

  const endGame = async (rounds) => {
    try {
      if (isLoggedIn) await API.recordGame(rounds);

      navigate("/");
      setMemes([]);
    } catch (error) {
      setError(error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const user = await API.getUserInfo();

      setLoggedIn(true);
      setUser(user);
    } catch (error) {
      if (isLoggedIn) setError(error);

      setLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <ErrorBoundary>
      <MessageContext.Provider value={{ setInfo, setError, setWarning }}>
        <CustomNavbar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          fetchUserInfo={fetchUserInfo}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route index element={<PlayButton onStartGame={startGame} />}></Route>
          <Route
            path="play"
            element={<Game memes={memes} endGame={endGame} />}
          ></Route>
          <Route
            path="profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <MessageToast message={message} setMessage={setMessage} />
      </MessageContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
