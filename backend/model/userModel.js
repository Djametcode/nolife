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
  avatar: {
    type: String,
    default: "",
  },
  follower: {
    type: Array,
    default: [],
  },
  notification: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
  return this.password;
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TIMES }
  );
};

userSchema.methods.comparePass = async function (userPass) {
  const isMatch = await bcrypt.compare(userPass, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
