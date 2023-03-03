const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    categories: [Category!]
    conversations: [Conversation!]

  }

  type Category {
    _id: ID!
    category: String
    conversations: [Conversation!]
  }

  type Conversations {
    _id: ID!
    category: String
    question: String
    reply: String
    categories: Category!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addConversation(conversationsId:ID!, category: String!, question:String!, bookmarks: Boolean, reply:[replyText: String!, createdAt: Date]): Conversations
    deleteConversation(conversationsId:ID!): Conversations
  }
`;

module.exports = typeDefs;
