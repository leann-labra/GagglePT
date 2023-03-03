const { AuthenticationError } = require('apollo-server-express');
const { User, Conversations } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async () => {
        return User.find().populate('conversations');
      },
    conversations: async (parent, { category }) => {
        const params = category ? { category } : {};
        return Conversations.find(params).sort({ createdAt: -1 });
      },
    conversation: async (parent, { conversationsId }) => {
        return Conversations.findOne({ _id: conversationsId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('conversations');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },

  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    // addCategory:
    // addConversation:
    // deleteCategory:
    // deleteConversation
    
  }
};

