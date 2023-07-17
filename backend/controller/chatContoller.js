const Chat = require("../model/chatModel");
const Message = require("../model/messageModel");

const createChat = async (req, res) => {
  const { user2 } = req.query;

  if (user2 === req.user.userId) {
    return res
      .status(200)
      .json({ msg: "TIdak bisa chat ke diri sendiri? lanjutkan?" });
  }

  const newChat = new Chat({
    participants: {
      user1: req.user.userId,
      user2: user2,
    },
    createdBy: req.user.userId,
  });

  try {
    const chat = await Chat.create(newChat);
    return res.status(200).json({ msg: "Success", chat });
  } catch (error) {
    console.log(err);
  }
};

const getChatById = async (req, res) => {
  const { id } = req.params;

  const chat = await Chat.findOne({ _id: id })
    .populate({
      path: "participants.user1",
      select: ["username", "avatar"],
    })
    .populate({
      path: "participants.user2",
      select: ["username", "avatar"],
    });

  if (!chat) {
    return res.status(404).json({ msg: "Chat not found" });
  }

  // const check1 = chat.participants.user1 === req.user.userId;
  // const check2 = chat.participants.user2 === req.user.userId;

  // if (!check1 || !check2) {
  //   return res.status(400).json({ msg: "You cannot see this chat" });
  // }

  const formatChat = [chat];

  return res.status(200).json({ msg: "Success", formatChat });
};

const getMyChat = async (req, res) => {
  try {
    const chat = await Chat.find({
      // $or: [
      //   { "participants.user1": req.user.userId },
      //   { "participants.user2": req.user.userId },
      // ],
    })
      .populate({ path: "participants.user1", select: ["username", "avatar"] })
      .populate({ path: "participants.user2", select: ["username", "avatar"] })
      .populate({ path: "createdBy", select: ["username", "avatar"] });
    return res.status(200).json({ msg: "Success", chat });
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const sender = req.user.userId;

  try {
    const chat = await Chat.findOne({ _id: id });

    const newMessage = new Message({
      text: text,
      sender: sender,
    });

    const message = await Message.create(newMessage);
    chat.message.push(message);
    await chat.save();

    return res.status(200).json({ msg: "Success", chat });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal server Error" });
  }
};

module.exports = { createChat, getChatById, sendMessage, getMyChat };
