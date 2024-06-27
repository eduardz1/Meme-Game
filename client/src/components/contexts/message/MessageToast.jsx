import { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import MessageContext from "./MessageContext";

/**
 * Toast used to display all the messages, has different behavior for errors.
 * @see MessageContext
 */
const MessageToast = () => {
  const { message, setMessage } = useContext(MessageContext);

  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast
        show={message.msg !== ""}
        autohide={message.type !== "error"}
        onClose={() => setMessage({ msg: "", type: "" })}
        delay={1000}
        // I prefer having them labeled as "error" instead of danger throughout the app
        bg={message.type === "error" ? "danger" : message.type}
      >
        {message.type === "error" && (
          <Toast.Header>
            <strong className="me-auto"> Error </strong>{" "}
          </Toast.Header>
        )}
        <Toast.Body className={message.type === "error" && "text-white"}>
          {message.msg}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MessageToast;
