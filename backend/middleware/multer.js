const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, fil, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, fil, cb) {
    cb(null, fil.originalname + "_" + Date.now());
  },
});

const upload = multer({ storage }).single("file");

module.exports = upload;
