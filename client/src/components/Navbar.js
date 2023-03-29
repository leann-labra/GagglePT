import React, { useState } from "react";

//components
import Chat from "./Chat";
import Login from "./login/Login";
import SignUp from "./login/Signup";

function NavBar() {
  const [ currentPage, setCurrentPage ] = useState('Login');
  const renderPage = () => {
    if (currentPage === 'Chat') {
      return (
        <div>
          <Chat />
        </div>
      )
    }
    if (currentPage === 'SignUp') {
      return (
        <div>
          <SignUp />
        </div>
      )
    }
    if (currentPage === 'Login'){
      return (
        <div>
          <Login
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )
    }
  };
  const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div>
      {/* {renderPage()} */}
    </div>
  )
}
export default NavBar;

