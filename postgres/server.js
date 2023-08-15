const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routes/userRoutes");
const db = require("./db/connectDB");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/sql", router);

const start = async () => {
  try {
    await db.connect();
    app.listen(3000, () => console.log(`Server running on port 3000`));
  } catch (error) {
    console.log(error);
  }
};

start();
