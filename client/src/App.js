// this will create a react component that inputs a text area message then preforms a fetch request to our openapi and get back a response and displays that response
import React, {useState} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  
  const handleSubmit = (e) => {
    console.log(message)
    e.preventDefault();
    fetch('/' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:message ,
    })
    // .then((res) => res.json())
    // .then((data) => setResponse(data.message))
    .catch(err => console.log(err))
  };

  return(
    <div className="App">
    <form onSubmit={handleSubmit}>
      <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}>        
      </textarea>
      <button type="submit">Submit</button>
    </form>
    <div>{response}</div>
    </div>
  );
};

export default App