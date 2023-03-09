import { gql } from "@apollo/client";

// getting one user
export const GET_USER = gql`
  query Query {
    users {
      _id
      username
      email
      password
    }
  }
`;

export const GET_CONVOS = gql`
  subscription {
    conversations {
      id
      user
      text
    }
  }
`;
