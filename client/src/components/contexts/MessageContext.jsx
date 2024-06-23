import React from "react";

const MessageContext = React.createContext({
  message: "",
  setMessage: () => {},
  setInfo: () => {},
  setError: () => {},
  setWarning: () => {},
});

export default MessageContext;
