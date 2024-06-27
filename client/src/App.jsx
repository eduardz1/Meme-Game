import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import API from "./api/API.mjs";
import CustomNavbar from "./components/CustomNavbar";
import LoggedInContext from "./components/contexts/LoggedInContext.jsx";
import MessageContext from "./components/contexts/message/MessageContext.jsx";
import MessageToast from "./components/contexts/message/MessageToast";
import useMessageContext from "./components/contexts/message/useMessageContext.mjs";
import ErrorPage from "./components/errors/Error404Page";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import ProtectedRoute from "./components/errors/ProtectedRoute";
import Game from "./components/game/Game";
import PlayButton from "./components/game/PlayButton";
import Profile from "./components/user/Profile";

/**
 * Main component of the application that manages the routing and the state of the user.
 */
const App = () => {
  const navigate = useNavigate();

  const { message, setError, setInfo, setWarning, setMessage } =
    useMessageContext();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [memes, setMemes] = useState([]);

  /**
   * Fetch the user info when the app is mounted.
   */
  useEffect(() => {
    fetchUserInfo();
  }, []);

  /**
   * Handle the login of the user. If the login is successful, set the user and
   * navigate to the home page.
   */
  const handleLogin = async (email, password) => {
    try {
      const user = await API.login(email, password);
      setLoggedIn(true);
      setUser(user);
      navigate("/");
      setInfo(`Welcome, ${user.name}!`);
    } catch (error) {
      setError(error);
    }
  };

  /**
   * Handle the logout of the user. If the logout is successful, set the user to
   * null and navigate to the home page.
   */
  const handleLogout = async () => {
    try {
      await API.logout();
      setLoggedIn(false);
      setUser(null);
      navigate("/");
      setInfo("You have been logged out.");
    } catch (error) {
      setError(error);
    }
  };

  /**
   * Fetch the user info from the API and set the user and the logged in state.
   * If the user is not logged in, set the user to null and the logged in state to
   * false.
   */
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
