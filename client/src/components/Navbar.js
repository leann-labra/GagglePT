import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

function NavBar() {
  return (
    <section>
      <h1>NavBar Placeholder</h1>
      <div>
        <SignUpForm />
        <LoginForm />
      </div>
    </section>
  );
}

export default NavBar;
