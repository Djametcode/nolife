require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

//route import
const authRoute = require("./route/userRoute");
const postRoute = require("./route/postRoute");
const chatRoute = require("./route/chatRoute");
const auth = require("./middleware/auth");

app.use(
  cors({
    origin: ["*"],
  })
);
app.use(express.json());
app.use("/api/v11/no-life/", authRoute);
app.use("/api/v11/no-life/post", auth, postRoute);
app.use("/api/v11/no-life/chat", auth, chatRoute);

//package import
const connectDB = require("./db/connectDB");

async function start() {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, console.log(`Server running ....`));
  } catch (error) {
    console.log(error);
  }
}
start();

