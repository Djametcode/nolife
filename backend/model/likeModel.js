const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  likeCreator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Like", likeSchema);
