const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Like", likeSchema);
