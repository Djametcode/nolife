const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please fill username"],
  },
  email: {
    type: String,
    required: [true, "Please fill email"],
    match: [/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm],
  },
  password: {
    type: String,
    required: [true, "Please fill password"],
  },
  posts: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  return this.password;
});

module.exports = mongoose.model("User", userSchema);
