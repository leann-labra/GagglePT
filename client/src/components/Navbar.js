import React, { useState } from "react";
// import SignUpForm from "./signUpForm";
// import LoginForm from "./loginForm";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Chat from "./Chat";
import React from "react";


function NavBar() {
  const [currentPage, setCurrentPage ] = useState('LogIn');

  const renderPage = () => {
    if (currentPage === 'Chat') {
      return (
        <div>
          <Chat 
          />
        </div>
      )
    }
    if (currentPage === 'SignUp') {
      return (
        <div>
          <Signup />
        </div>
      )
    }
    if (currentPage === "Login"){
    return (
      <div>
        <Login />
      </div>
    )
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <Login 
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      />
      {renderPage()}
    </div>
  )
}

export default NavBar;
