import { useState } from "react";

const SigninChatForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    nickname: "",
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
      nickname: "",
    });
  };
  const { nickname } = state;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nickname}
        name="nickname"
        onChange={handleChange}
        placeholder="Enter your name..."
      />
      <button>Join</button>
    </form>
  );
};

export default SigninChatForm;
