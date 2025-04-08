const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    // console.log(decoded);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (decoded.email !== req.email) {
      return res.status(400).json({ message: "Invalid email" });
    }
    console.log(decoded);
    const checkPassword = await bcrypt.compare(
      req.body.password,
      decoded.user.password
    );
    console.log(checkPassword);
    if (!checkPassword) {
      return res.status(403).json({ message: "Invalid password" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = auth;