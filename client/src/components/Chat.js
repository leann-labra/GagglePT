import React, { useState } from "react";
import "./App.css";
import "./normalize.css";

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
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default Chat;
