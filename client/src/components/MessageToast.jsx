import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import PropTypes from "prop-types";

const MessageToast = ({ message, setMessage }) => {
  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast
        show={message.msg !== ""}
        autohide
        onClose={() => setMessage({ msg: "", type: "" })}
        delay={1000}
        bg={message.type === "error" ? "danger" : "light"}
      >
        {message.type === "error" && (
          <strong className="me-auto">
            <Toast.Header>{message.type}</Toast.Header>
          </strong>
        )}
        <Toast.Body className={message.type === "error" && "text-white"}>
          {message.msg}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

MessageToast.propTypes = {
  message: PropTypes.object,
  setMessage: PropTypes.func,
};

export default MessageToast;
