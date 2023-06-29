const User = require("../model/userModel");
const Post = require("../model/postModel");
const Like = require("../model/likeModel");
const Comment = require("../model/commentModel");

const createPost = async (req, res) => {
  const { text } = req.body;
  const createdBy = req.user.userId;
  const post = new Post({
    text: text,
    createdBy: createdBy,
  });
  try {
    console.log(req.user.userId);
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
    const data = await Post.find({}).populate({
      path: "createdBy",
    });

    for (const obj of data) {
      for (let i = 0; i < obj.like.length; i++) {
        const objectLike = obj.like[i];
        const userId = objectLike.createdBy;

        return res.status(200).json({ text, image, userId });
      }
    }
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

    // const filter = post.like.includes(
    //   (item) => item.createdBy === req.user.userId
    // );

    // if (filter) {
    //   return res.status(401).json({ msg: "Only can like once" });
    // }
    const newLike = new Like({
      createdBy: createdBy,
    });

    const likeData = await Like.create(newLike);
    await post.like.push(likeData);
    await post.save();

    return res.status(200).json({ msg: "Success", post });
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
  deletePost,
  giveLike,
  giveComment,
  deleteComment,
};
