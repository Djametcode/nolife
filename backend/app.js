require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const cors = require("cors");

//route import
const authRoute = require("./route/userRoute");
const postRoute = require("./route/postRoute");
const auth = require("./middleware/auth");

app.use(express.json());
app.use(cors());
app.use("/api/v11/no-life/", authRoute);
app.use("/api/v11/no-life/post", auth, postRoute);

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
