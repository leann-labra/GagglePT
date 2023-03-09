import React, { useState } from "react";

import Convo from "./Convo";

function Chat({ user }) {
  const [userInput, setUserInput] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmit = (e) => {
    setSentMessage(userInput);
    e.preventDefault();
    fetch("/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    })
      .then((data) => data.json())
      .then((data) => setResponse(data));
  };
  const handleChange = (e) => setUserInput(e.target.value);
  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section class="chatbox">
        <div className="chat-log">
          {/* user chat */}
          <div className="chat-message">
            <div className="chat-message-center">
              <div className="avatar"></div>
              <div className="message">User chat : {sentMessage}</div>
            </div>
          </div>
          {/* ai chat */}
          <div className="chat-message ai">
            <div className="chat-message-center">
              <div className="avatar"></div>
              <div className="message">AI message: {response}</div>
            </div>
          </div>
        </div>
        <div className="chat-input-holder">
          <textarea
            value={userInput}
            className="chat-input-ta"
            placeholder="Type here to chat..."
            onChange={handleChange}
          ></textarea>
          <button className="submit-btn" type="button" onClick={handleSubmit}>
            Goose it
          </button>
        </div>
        {/* <Convo /> */}
      </section>
    </div>
  );
}

export default Chat;
