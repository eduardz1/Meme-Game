import { useEffect } from "react";
import { useState } from "react";
import CustomNavbar from "./components/CustomNavbar";
import API from "./api/API.mjs";
import PlayButton from "./components/PlayButton";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
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

  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      setLoggedIn(true);
      setUser(user);
    };
    checkAuth();
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
        <PlayButton />
      </div>
    </div>
  );
};

export default App;
