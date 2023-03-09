import React from 'react';

export default function SignUp({ currentPage, handlePageChange }) {
  return (
    <div className='signup signinbox'>
      <div className='signup banner'>
        Sign up for GagglePT! 
      </div>
      <div className='signup user'>
        <input placeholder='Enter an email'></input>
        <br></br>
        <input placeholder='Enter a username'></input>
      </div>
      <div className='signup pass'>
        {/* hide pass input */}
        <input placeholder='Enter a password'></input>
      </div>
        <button
                href="#Chat"
                //  onClick needs to be dependent on login factors
                 onClick={() => handlePageChange('Chat')}
                 className={currentPage === 'Chat' ? 'nav-link active' : 'nav-link'}
                 >Create my account
        </button>
        <br></br>
        {/* <a
        href="#LogIn"
        onClick={() => handlePageChange('LogIn')}
        className={currentPage === 'LogIn' ? 'nav-link active' : 'nav-link'}
        >
          Already have an account? Log in here
        </a> */}
    </div>
  );
}

