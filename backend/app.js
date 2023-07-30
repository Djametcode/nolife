require("dotenv").config();
const express = require("express");
const app = express();
// const { Server } = require("socket.io");
// const http = require("http").createServer(app);
// const io = new Server(http, {
//   cors: {
//     origin: ["*"],
//   },
// });
const port = 3000;
const cors = require("cors");


//route import
const authRoute = require("./route/userRoute");
const postRoute = require("./route/postRoute");
const chatRoute = require("./route/chatRoute");
const auth = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use("/api/v11/no-life/", authRoute);
app.use("/api/v11/no-life/post", auth, postRoute);
app.use("/api/v11/no-life/chat", auth, chatRoute);

//package import
const connectDB = require("./db/connectDB");

//socket io handler
// io.on("connect", (socket) => {
//   console.log("A user connected");

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

async function start() {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("connected");

    app.listen(port, console.log(`Server running ....`));
  } catch (error) {
    console.log(error);
  }
}
start();

