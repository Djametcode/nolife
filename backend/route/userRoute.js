const express = require("express");
const router = express.Router();
const { registUser, loginUser } = require("../controller/userController");

router.post("/regist-user", registUser);
router.post("/login-user", loginUser);

module.exports = router;
