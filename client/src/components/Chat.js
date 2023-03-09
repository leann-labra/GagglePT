import React, { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }).then((data) => setResponse(data.message));
  };

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

            <div className="avatar">

            </div>
            <div className="message">
              User chat
            </div>
          </div>
        </div>
        {/* ai chat */}
        <div className="chat-message ai">
          <div className="chat-message-center">
            <div className="avatar">

            </div>
            <div className="message">
              AI message
              </div>
              </div>
        </div>
      </div>
      <div className="chat-input-holder">
        <textarea className="chat-input-ta" placeholder="Type here to chat...">
        </textarea>
          <button className="submit-btn" type='button'>Goose it</button>
      </div>

    </section>
  </div>
  );
}

export default Chat;
