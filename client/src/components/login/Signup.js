import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

export default function SignUp({ currentPage, handlePageChange }) {
  // Sets initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Sets state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Executes addUser fx
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="signup signinbox">
      <div className="signup banner">Sign up for GagglePT!</div>
      <div className="signup user">
        <input
          placeholder="Enter an email"
          name="email"
          type="email"
          id="email"
          value={userFormData.email}
          onChange={handleInputChange}
        />
        <br></br>
        <input
          placeholder="Enter a username"
          name="username"
          type="text"
          id="username"
          value={userFormData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="signup pass">
        {/* hide pass input */}
        <input
          placeholder="Enter a password"
          type="password"
          name="password"
          id="password"
          value={userFormData.password}
          onChange={handleInputChange}
        />
      </div>
      <button
        href="#Chat"
        //  onClick needs to be dependent on login factors
        onClick={handleFormSubmit}
        className={currentPage === "Chat" ? "nav-link active" : "nav-link"}
      >
        Create my account
      </button>
      <br></br>
      <Link
          to="/login">
          Already have an account? Log in here
        </Link>
    </div>
  );
}
        