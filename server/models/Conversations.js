const { Schema, model } = require("mongoose");

const conversationsSchema = new Schema({
  category: {
    type: String,
  },

  question: {
    type: String,
    required: "Please ask away!",
    minlength: 1,
    maxlength: 500,
    trim: true,
  },

bookmarks:{
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

const Thought = model("Conversations", conversationsSchema);

module.exports = Thought;
