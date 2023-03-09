const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async () => {
      return User.find().populate("conversations");
    },

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
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
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

    addConversation: async (parent, { question, reply, convoId }) => {
      const convo = {
        question,
        reply,
        convoId,
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
        }
      );
    },
  },
};

module.exports = resolvers;
