import React from "react";

import Convo from "./components/Convo.js";

function Chat({ user }) {
  return (
    <section class="chatbox">
      <div className="chat-log">
        {/* user chat */}
        <div className="chat-message">
          <div className="chat-message-center">
            <div className="avatar"></div>
            <div className="message">User chat</div>
          </div>
        </div>
        {/* ai chat */}
        <div className="chat-message ai">
          <div className="chat-message-center">
            <div className="avatar"></div>
            <div className="message">AI message</div>
          </div>
        </div>
      </div>
      <div className="chat-input-holder">
        <textarea
          className="chat-input-ta"
          placeholder="Type here to chat..."
        ></textarea>
        <button className="submit-btn" type="button">
          Goose it
        </button>
      </div>
      <Convo />
    </section>
  );
}

export default Chat;
