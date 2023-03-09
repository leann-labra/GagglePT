import React from 'react';

export default function Login({ currentPage, handlePageChange }) {
  return (
    <div className='login signinbox'>
      <div className='login banner'>
        Sign into GagglePT! 
      </div>
      <div className='login user'>
        <input placeholder='Username'></input>
      </div>
      <div className='login pass'>
        {/* hide input */}
        <input placeholder='Password'></input>
      </div>
        <button
         href="#Chat"
        //  onClick needs to be dependent on login factors
         onClick={() => handlePageChange('Chat')}
         className={currentPage === 'Chat' ? 'nav-link active' : 'nav-link'}
        >Login
        </button>
        <br></br>
        <a
        href="#Signup"
        onClick={() => handlePageChange('SignUp')}
        className={currentPage === 'SignUp' ? 'nav-link active' : 'nav-link'}
        >
          No account? Sign up here
        </a>
    </div>
  );
}

