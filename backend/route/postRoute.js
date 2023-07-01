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
} = require("../controller/postController");
const upload = require("../middleware/multer");

router.post("/create-post", upload, createPost);
router.patch("/update-post/:id", updatePost);
router.get("/get-all-post", getAllPost);
router.delete("/delete-post/:id", deletePost);
router.post("/give-like/:id", giveLike);
router.get("/get-like/:id", getAllLike);
router.post("/give-comment/:id", giveComment);
router.delete("/delete-comment/:id", deleteComment);

module.exports = router;
