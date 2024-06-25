import { useState } from "react";

/**
 * A hook that provides functions to set different kinds of messages.
 * @see MessageContext
 */
const useMessageContext = () => {
  const [message, setMessage] = useState({ msg: "", type: "" });

  const setError = (err) => {
    setMessage({ msg: err.message || "Unknown Error", type: "error" });
  };

  const setInfo = (msg) => {
    setMessage({ msg: msg, type: "info" });
  };

  const setWarning = (msg) => {
    setMessage({ msg: msg, type: "warning" });
  };

  return { message, setError, setInfo, setWarning, setMessage };
};

export default useMessageContext;
