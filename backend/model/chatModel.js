const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  participants: {
    user1: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    user2: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  message: [],
});

module.exports = mongoose.model("Chat", chatSchema);
