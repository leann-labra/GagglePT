// this will create a react component that inputs a text area message then preforms a fetch request to our openapi and get back a response and displays that response
import React, {useState} from 'react';
import './normalize.css';
import './App.css';

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

  return(
    <div className="App">
      <aside className="sidemenu">
        <div className='side-menu-button'>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className='chat-log'>
          <div className='chat-message'>
            <div className='chat-message-center'>
              <div className='avatar'>
              </div>
              <div className='message'>
                Hello from user
              </div>
            </div>
          </div>
          <div className='chat-message ai'>
            <div className='chat-message-center'>
              <div className='avatar'>
                {/* add svg??? */}
              </div>
              <div className='message'>
                Hello from AI
              </div>
            </div>
          </div>
        </div>
        <div className='chat-input-holder'>
          <textarea 
          rows="1"
          className='chat-input-textarea'
          placeholder='Click here to chat'>
          </textarea>
        </div>

      </section>
    <form onSubmit={handleSubmit}>
      <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}>        
      </textarea>
      <button type="submit">submit</button>
    </form>
    <div>{response}</div>
    </div>
  );
}

export default App;
