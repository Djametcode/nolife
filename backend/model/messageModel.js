const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  text: {
    type: String,
    required: [true],
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  images: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Message", messageSchema);
