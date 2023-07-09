const express = require("express");
const router = express.Router();
const {
  registUser,
  loginUser,
  getCurrentUser,
} = require("../controller/userController");

router.post("/regist-user", registUser);
router.post("/login-user", loginUser);

module.exports = router;
