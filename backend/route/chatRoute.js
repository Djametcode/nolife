const express = require("express");
const route = express.Router();
const {
  createChat,
  sendMessage,
  getMyChat,
  getChatById,
} = require("../controller/chatContoller");

route.post("/create-chat/", createChat);
route.post("/send-msg/:id", sendMessage);
route.get("/my-chat", getMyChat);
route.get("/chat-detail/:id", getChatById);

module.exports = route;
