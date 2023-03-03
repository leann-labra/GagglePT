const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    categories: [Category!]
    conversations: [Conversations!]
  }

  type Category {
    _id: ID!
    category: String
    conversations: [Conversations!]
  }

  type Conversations {
    _id: ID!
    category: String
    question: String
    reply: [String]
    categories: Category!
    bookmarks: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  input conversationInput {
    _id: ID!
    category: String
    question: String
    reply: [String]
    bookmarks: Boolean
  }
  type Query {
    users: User
    user(username: String!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addConversation(input: conversationInput!): Conversations
    deleteConversation(conversationsId: ID!): Conversations
  }
`;

module.exports = typeDefs;
