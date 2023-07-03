const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registUser = async (req, res) => {
  try {
    const data = await User.create({ ...req.body });
    return res.status(200).json({ msg: "Success registration", data });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ msg: "Please fill requipment" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "Email not registered yet, please heading to regist page",
      });
    }
    const isPasswordMatch = await user.comparePass(password);
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Password wrong" });
    }

    const token = await user.createJWT();

    return res.status(200).json({ msg: "Login success", user, token });
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ msg: "User not found please login?" });
    }

    return res.status(200).json({
      msg: "success",
      data: {
        username: data.username,
        email: data.email,
        post: data.posts,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registUser, loginUser, getCurrentUser };
