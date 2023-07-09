const User = require("../model/userModel");
const Post = require("../model/postModel");
const Like = require("../model/likeModel");
const Comment = require("../model/commentModel");
const Follower = require("../model/followerModel");
const Notif = require("../model/notifModel");
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

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.status(200).json({ msg: "Success", data });
  } catch (error) {
    console.log(error);
  }
};

const getAllPost = async (req, res) => {
  try {
    const data = await Post.find({})
      .populate({
        path: "createdBy",
        select: ["username", "email", "avatar"],
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
    const hasLike = await Like.exists({ likeCreator: createdBy, postId: id });

    if (hasLike) {
      return res.status(400).json({ msg: "You already like this" });
    }

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
    return res.status(500).json({ msg: "Internal server Error" });
  }
};

const deleteLike = async (req, res) => {
  const { id } = req.params;
  try {
    const likeIndexs = await Like.findOne({
      postId: id,
      likeCreator: req.user.userId,
    });
    const data = await Like.findOneAndDelete({
      postId: id,
      likeCreator: req.user.userId,
    });

    if (!data) {
      return res.status(404).json({ msg: "like not found" });
    }

    const post = await Post.findOne({ _id: id });

    const likeindex = post.like.indexOf(likeIndexs._id);

    if (likeindex > -1) {
      post.like.splice(likeindex, 1);
    }

    await post.save();

    return res.status(200).json({ msg: "Like deleted", data });
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

const getCommentPostId = async (req, res) => {
  const { id } = req.query;
  try {
    const post = await Post.findOne({ _id: id }).populate({
      path: "createdBy",
      select: ["username", "avatar"],
    });
    const postFormat = [
      {
        text: post.text,
        images: post.images,
        createdBy: post.createdBy,
      },
    ];
    const data = await Comment.find({ postId: id }).populate({
      path: "createdBy",
      select: ["username", "avatar"],
    });
    return res.status(200).json({
      msg: "Success",
      postFormat,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMyComment = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await Comment.find({ createdBy: id })
      .populate({
        path: "postId",
        populate: {
          path: "createdBy",
          select: ["username", "avatar"],
        },
      })
      .populate({
        path: "createdBy",
        select: ["username", "avatar"],
      });

    return res.status(200).json({ msg: "Success", data });
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

const updateAvatar = async (req, res) => {
  const { id } = req.params;
  try {
    let file = req.file;
    const { username } = req.body;

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: "Testing",
    });
    const image = result.secure_url;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { avatar: image, username: username },
      { new: true }
    );

    return res.status(200).json({ msg: "Success", user });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await User.find({});

    return res.status(200).json({ msg: "Success", data });
  } catch (error) {
    console.log(error);
  }
};

const followUser = async (req, res) => {
  const { id } = req.params;
  const { userId, username } = req.user;
  try {
    if (id === userId) {
      return res
        .status(400)
        .json({ msg: "Gak bisa follow diri sendiri wkwkwk" });
    }

    const check = await Follower.exists({
      createdBy: userId,
      target: id,
    });

    console.log(check);

    if (check) {
      return res.status(400).json({ msg: "Already follow" });
    }

    const follower = await Follower.create({
      createdBy: userId,
      target: id,
    });

    const notif = await Notif.create({
      text: `${username} following you !`,
    });

    const user = await User.findOne({ _id: id });
    await user.follower.push(follower);
    await user.notification.push(notif);
    await user.save();

    return res.status(200).json({ msg: "Success message and notify", user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.user.userId });

    if (!data) {
      return res.status(404).json({ msg: "User not found please login?" });
    }

    return res.status(200).json({
      msg: "success",
      data: [
        {
          username: data.username,
          email: data.email,
          post: data.posts,
          avatar: data.avatar,
          follower: data.follower,
          notif: data.notification,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  getAllPost,
  getPostById,
  getMyPost,
  deletePost,
  giveLike,
  getCommentPostId,
  giveComment,
  deleteComment,
  getAllLike,
  updateAvatar,
  getMyComment,
  getAllUser,
  followUser,
  getCurrentUser,
  deleteLike,
};
