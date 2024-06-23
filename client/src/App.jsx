import { useEffect, useState } from "react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import MessageToast from "./components/MessageToast";
import MessageContext from "./components/contexts/MessageContext.jsx";
import useMessageContext from "./components/contexts/useMessageContext.mjs";
import ErrorPage from "./components/errors/Error404Page";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import ProtectedRoute from "./components/errors/ProtectedRoute";
import LoggedInContext from "./components/contexts/LoggedInContext.jsx";
import Game from "./components/game/Game";
import PlayButton from "./components/game/PlayButton";
import Profile from "./components/user/Profile";
import API from "./api/API.mjs";

const App = () => {
  const { message, setError, setInfo, setWarning, setMessage } =
    useMessageContext();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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

  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <ErrorBoundary>
      <MessageContext.Provider
        value={{ message, setMessage, setInfo, setError, setWarning }}
      >
        <MessageToast />
        <LoggedInContext.Provider value={isLoggedIn}>
          <CustomNavbar
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            fetchUserInfo={fetchUserInfo}
          />
          <Routes>
            <Route index element={<PlayButton setMemes={setMemes} />}></Route>
            <Route
              path="play"
              element={<Game memes={memes} setMemes={setMemes} />}
            ></Route>
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </LoggedInContext.Provider>
      </MessageContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
