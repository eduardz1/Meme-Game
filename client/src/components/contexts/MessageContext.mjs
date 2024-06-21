import React from "react";

const MessageContext = React.createContext({
  setInfo: (info) => {},
  setError: (error) => {},
});

export default MessageContext;
