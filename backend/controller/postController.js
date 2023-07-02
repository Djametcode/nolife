const User = require("../model/userModel");
const Post = require("../model/postModel");
const Like = require("../model/likeModel");
const Comment = require("../model/commentModel");
const cloudinary = require("../utils/cloudinary");

const createPost = async (req, res) => {
  const { text } = req.body;
  const createdBy = req.user.userId;
  try {
    let file = req.file;

    if (!file) {
      const noImages = new Post({
        text: text,
        createdBy: createdBy,
      });

      const user = await User.findOne({ _id: req.user.userId });

      if (!user) {
        return res.status(401).json({ msg: "Please login first" });
      }

      const data = await Post.create(noImages);
      await user.posts.push(data);
      await user.save();

      return res.status(200).json({ msg: "Success with no Images", user });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "Testing",
    });

    const image = result.secure_url;

    const post = new Post({
      text: text,
      images: image,
      createdBy: createdBy,
    });

    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(401).json({ msg: "Please login first" });
    }

    const data = await Post.create(post);
    await user.posts.push(data);
    await user.save();

    return res.status(200).json({ msg: "Success", user });
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { text },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.status(200).json({ msg: "Success update post", post });
  } catch (error) {
    console.log(error);
  }
};

const getAllPost = async (req, res) => {
  try {
    const data = await Post.find({})
      .populate({
        path: "createdBy",
        select: ["username", "email"],
      })
      .sort("-timePosted");
    if (!data) {
      return res.status(404).json({ msg: "Post deleted" });
    }

    return res.status(200).json({ msg: "Success", data });
  } catch (error) {
    console.log(error);
  }
};

const getMyPost = async (req, res) => {
  try {
    const data = await Post.find({ createdBy: req.user.userId });
    if (!data) {
      return res.status(200).json({ msg: "Belum ada postingan" });
    }
    return res.status(200).json({ msg: "Success", data });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.findOneAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({ msg: "Post already deleted or wrong id" });
    }

    return res.status(200).json({ msg: "Post deleted", data });
  } catch (error) {
    console.log(error);
  }
};

const giveLike = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user.userId;
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found maybe deleted?" });
    }

    //need to fix only can like once

    const filterUser = post.like.includes();
    const newLike = new Like({
      likeCreator: createdBy,
      postId: id,
    });

    const likeData = await Like.create(newLike);
    await post.like.push(likeData);
    await post.save();

    return res.status(200).json({ msg: "Success", post });
  } catch (error) {
    console.log(error);
  }
};

const getAllLike = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Like.find({ postId: id }).populate({
      path: "likeCreator",
      select: ["username", "email"],
    });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const giveComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const createdBy = req.user.userId;

  const newComment = new Comment({
    commentText: text,
    createdBy: createdBy,
    postId: id,
  });

  try {
    const post = await Post.findOne({ _id: id });

    if (!post) {
      return res.status(404).json({ msg: "Post not found or deleted?" });
    }

    const newCommentData = await Comment.create(newComment);
    await post.comments.push(newCommentData);
    await post.save();

    return res.status(200).json({ msg: "Added Comment !", newCommentData });
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const commnet = await Comment.findOneAndDelete({ _id: id });

    if (!commnet) {
      return res.status(404).json({ msg: "Comment not found or deleted" });
    }

    return res.status(200).json({ msg: "Comment deleted", commnet });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  getAllPost,
  getMyPost,
  deletePost,
  giveLike,
  giveComment,
  deleteComment,
  getAllLike,
};
