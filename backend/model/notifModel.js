const mongoose = require("mongoose");
const { Schema } = mongoose;

const notifSchema = new Schema({
  text: {
    type: String,
  },
});

module.exports = mongoose.model("Notif", notifSchema);
