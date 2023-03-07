const { AuthenticationError } = require("apollo-server-express");
const { User, Conversations } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async () => {
      return User.find().populate("conversations");
    },
    // conversations: async (parent, { category }) => {
    //   const params = category ? { category } : {};
    //   return Conversations.find(params).sort({ createdAt: -1 });
    // },
    // conversation: async (parent, { conversationsId }) => {
    //   return Conversations.findOne({ _id: conversationsId });
    // },
    //adding context to find logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(
          "conversations"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // addUser: async (parent, { username, email, password }) => {
    //   const user = await User.create({ username, email, password });
    //   const token = signToken(user);
    //   return { token, user };
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const rightPassword = await user.isCorrectPassword(password);

      if (!rightPassword) {
        throw new AuthenticationError("Oops! Wrong password, try again");
      }

      const token = signToken(user);

      return { token, user };
    },

    addConversation: async (parent, { question, reply, category, convoId }) => {
      const convo = {
        question, 
        reply,
        convoId, 
        category
      };

      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            savedConvos: convo,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );
    }
    addCategory: async (parent, { userId, convoId, category }) => {
      return Conversations.findOneAndUpdate(
        { _id: convoId },
        {
          $addToSet: { category: { category } },
        },
        {
          new: true,
          runValidators: true,
        }
      );

    deleteConversation: async (parent, { convoId }) => {
      return Conversation.findOneAndDelete({ _id: convoId });
    },
    // deleteCategory: async (parent, { convoId, categoryId }) => {
    //   return Conversation.findOneAndUpdate(
    //     { _id: convoId },
    //     { $pull: { category: { _id: categoryId } } },
    //     { new: true }
    //   );
    // },
  },
};

module.exports = resolvers;
