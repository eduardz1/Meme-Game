import React from "react";

const MessageContext = React.createContext({
  setInfo: (info) => {},
  setError: (error) => {},
  setWarning: (warning) => {},
});

export default MessageContext;
