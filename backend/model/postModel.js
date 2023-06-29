const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  text: {
    type: String,
    required: [true, "Need to be fill"],
  },
  images: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  like: [],
  comments: [],
  share: [],
});

module.exports = mongoose.model("Post", postSchema);
