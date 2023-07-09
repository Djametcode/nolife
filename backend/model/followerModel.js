const mongoose = require("mongoose");
const { Schema } = mongoose;

const followeSchema = new Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  target: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Follower", followeSchema);
