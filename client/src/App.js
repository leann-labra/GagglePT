// this will create a react component that inputs a text area message then preforms a fetch request to our openapi and get back a response and displays that response
import React from "react";
import "./App.css";
import "./normalize.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { setContext } from '@apollo/client/link/context';

//importing apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// import routes from other pages and components here
import NavBar from "./components/Navbar";
import Chat from "./components/Chat";
import Login from "./components/login/Login";
import SignUp from "./components/login/Signup";


const httpLink = createHttpLink({
  uri: '/graphql',
});
  const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <NavBar/>
      <Router>
        <Routes>
          <Route
          path="/"
          element={<Chat/>}
          />
          <Route
          path="/login"
          element={<Login/>}
          />
          <Route
          path="/signup"
          element={<SignUp/>}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
