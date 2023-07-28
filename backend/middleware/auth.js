const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Please login first" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data);
    req.user = data;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authentication;
