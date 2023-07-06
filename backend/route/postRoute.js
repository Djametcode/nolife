const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  getAllPost,
  deletePost,
  giveLike,
  giveComment,
  deleteComment,
  getAllLike,
  getMyPost,
  getPostById,
  getCommentPostId,
  updateAvatar,
} = require("../controller/postController");
const upload = require("../middleware/multer");

router.post("/create-post", upload, createPost);
router.patch("/update-post/:id", updatePost);
router.get("/get-all-post", getAllPost);
router.get("/post/:id", getPostById);
router.get("/get-my-post", getMyPost);
router.delete("/delete-post/:id", deletePost);
router.post("/give-like/:id", giveLike);
router.get("/get-like/:id", getAllLike);
router.post("/give-comment/:id", giveComment);
router.delete("/delete-comment/:id", deleteComment);
router.get("/comment/:id", getCommentPostId);
router.patch("/update-avatar/:id", upload, updateAvatar);

module.exports = router;
