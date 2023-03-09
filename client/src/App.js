// this will create a react component that inputs a text area message then preforms a fetch request to our openapi and get back a response and displays that response
import React, { useState } from "react";
import "./App.css";
import "./normalize.css";


//importing apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import routes from other pages and components here

//accessing database from graphql
const httpLink = createHttpLink({
  uri: "/graphql",
});

// ---TAKEN FROM ACTIVITIES SO MAY NEED ADJUSTMENTS AS SITE PROGRESSES--- //
//creating a token when user logs into the page
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/' , {
      method: 'POST',

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((data) => setResponse(data.message));
  };

  return (
    <ApolloProvider client={client}>
      {/* add routes here for whichever pages or components if there are any */}
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
            <textarea className="chat-input-ta">

            </textarea>
          </div>

        </section>
      </div>
    </ApolloProvider>
  );
}

export default App;
