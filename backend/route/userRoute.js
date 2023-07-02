const express = require("express");
const router = express.Router();
const {
  registUser,
  loginUser,
  getCurrentUser,
} = require("../controller/userController");
const { route } = require("./postRoute");

router.post("/regist-user", registUser);
router.post("/login-user", loginUser);
router.get("/get-current-user/:id", getCurrentUser);

module.exports = router;
