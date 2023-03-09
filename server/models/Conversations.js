const { Schema, model } = require("mongoose");

// saving the convoSchema as a subdocument of Users since each user has saved chats
const convoSchema = new Schema({
  convoId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: "Please ask away!",
    minlength: 1,
    maxlength: 500,
    trim: true,
  },

  bookmarks: {
    type: Boolean,
  },

  reply: [
    {
      replyText: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

module.exports = convoSchema;
