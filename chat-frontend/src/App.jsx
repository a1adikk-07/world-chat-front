import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";
import io from "socket.io-client";

import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";

function App() {
  const [nickname, setNickname] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (nickname) {
      const ws = io.connect("http://localhost:5000");
      setSocket(ws);
      ws.on("chat-message", (data) => {
        const { nickname, message } = JSON.parse(data);
        setMessages((prevMessages) => {
          const newMessage = {
            id: nanoid(),
            type: "user",
            message,
            nickname,
          };

          return [...prevMessages, newMessage];
        });
      });
    }
  }, [nickname]);

  const addNickname = useCallback(({ nickname }) => setNickname(nickname), []);

  const addMessage = useCallback(
    ({ message }) => {
      setMessages((prevMessages) => {
        const newMessage = {
          id: nanoid(),
          type: "you",
          message,
          nickname,
        };

        return [...prevMessages, newMessage];
      });

      socket.emit("chat-message", JSON.stringify({ nickname, message }));
    },
    [nickname, socket]
  );

  return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <Chat items={messages} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
    </div>
  );
}

export default App;
