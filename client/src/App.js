// this will create a react component that inputs a text area message then preforms a fetch request to our openapi and get back a response and displays that response
import React from "react";
import "./App.css";
import "./normalize.css";


//importing apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import routes from other pages and components here
// import Login from "./components/login/Login";
import NavBar from "./components/Navbar";

const client = new ApolloClient({ 
  link: createHttpLink({ uri: 'http://localhost:3001.com/graphql' }),
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* add routes here for whichever pages or components if there are any */}
      <NavBar />
    </ApolloProvider>
  );
}

export default App;
