import { React, useState } from "react";
import { useSubscription } from "@apollo/client";
import { GET_CONVOS } from "../utils/queries";

const Convo = ({ user }) => {
  const [conversation, setConversation] = useState("");
  const [response, setResponse] = useState("");

  const { data } = useSubscription(GET_CONVOS);
  if (!data) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation }),
    }).then((data) => setResponse(data.conversation));
  };
  return (
    <div>
      {/* map fetched data here */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
        ></textarea>
        <button type="submit">submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default Convo;
