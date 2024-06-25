import React from "react";

/**
 * Context used to display messages of different kind to the user as Toasts.
 * @see MessageToast
 */
const MessageContext = React.createContext({
  message: "",
  setMessage: () => {},
  setInfo: () => {},
  setError: () => {},
  setWarning: () => {},
});

export default MessageContext;
