const mongoose = require("mongoose");
const userModel = require("./userModel");
const { Schema } = mongoose;

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: [true, "Need to fill"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  like: {
    type: Array,
    default: [],
  },
  reply: {
    type: Array,
    default: [],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
