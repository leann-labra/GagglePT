import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../utils/mutations";
import {Link} from "react-router-dom";

export default function Login({ currentPage, handlePageChange }) {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  
  //Ammended loginUser import
  const [loginUser] = useMutation(LOGIN_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setUserFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="login signinbox">
      <div className="login banner">Sign into GagglePT!</div>
      <div className="login user">
        <input
          type="email"
          name="email"
          value={userFormData.email}
          onChange={handleInputChange}
          placeholder="Email"
        ></input>
      </div>
      <div className="login pass">
        <input
          type="password"
          name="password"
          value={userFormData.password}
          onChange={handleInputChange}
          placeholder="Password"
        ></input>
      </div>
      <button
      type="submit"
        className={currentPage === "Chat" ? "nav-link active" : "nav-link"}
      > Login
      </button>
      <br></br>
     <Link
      to="/signup"
      >
       No account? Sign up here</Link>
    </div>
  );
}
