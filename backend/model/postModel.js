const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  text: {
    type: String,
    required: [true, "Need to be fill"],
  },
  images: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  timePosted: {
    type: Date,
    default: Date.now(),
  },
  like: [],
  comments: [],
  share: [],
});

module.exports = mongoose.model("Post", postSchema);
