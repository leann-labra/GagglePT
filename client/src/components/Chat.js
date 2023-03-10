import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";

function Chat() {
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  
  // const { data } = useQuery(GET_USER, {
  //   variables: { username: Auth.getProfile().data._id },
  // });

  const [userInput, setUserInput] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;
  //       if (!token) {
  //         return false;
  //       }
  //       setUserData(data?.user || []);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getUserData();
  // });

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

  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        {/* {userData.savedConvos.map((convo) => { */}
            <div className="chat-log" >
              <div className="chat-message">
                <div className="chat-message-center">
                  <div className="avatar"></div>
                  <div className="message">User chat : {sentMessage}</div>
                </div>
              </div>
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
      </section>
    </div>
  );
}
export default Chat;

