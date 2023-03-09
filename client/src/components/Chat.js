import React from "react";
import "./App.css";
import "./normalize.css";

import Convo from "./components/Convo";

function Chat({ user }) {
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
        <Convo />
      </section>
    </div>
  );
}

export default Chat;
