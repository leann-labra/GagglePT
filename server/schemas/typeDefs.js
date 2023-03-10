const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedConvos: [Conversations]
  }

  type Conversations {
    _id: ID!
    convoId: String
    question: String
    reply: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input conversationInput {
    _id: ID!
    question: String
    reply: [String]
  }

  type Query {
    users: User
    user(username: String!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addConversation(input: conversationInput!): User
  }
`;

module.exports = typeDefs;
