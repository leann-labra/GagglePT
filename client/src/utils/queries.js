import { gql } from "@apollo/client";

// getting one user
export const GET_USER = gql`
  query Query {
    users {
      _id
      username
      email
      password
      savedConvos {
        convoId
        question
        reply
      }
    }
  }
`;
