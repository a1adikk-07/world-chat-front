import { useState } from "react";

const ChatForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    message: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      message: "",
    });
  };

  const { message } = state;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={message}
        name="message"
        onChange={handleChange}
        placeholder="Message"
      />
      <button>Send</button>
    </form>
  );
};

export default ChatForm;
