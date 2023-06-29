const User = require("../model/userModel");
const Post = require("../model/postModel");

const createPost = async (req, res) => {
  try {
    // const user = await User.findOne({ _id: req.user.userId });
    // const post = await Post.create({ ...req.body });

    return res.status(200).json({ msg: "test" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createPost };
