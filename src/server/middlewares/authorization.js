const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_TOKEN = process.env.JWT_KEY || "thisisasecretkey";

const auth = async (req, res, next) => {
  const { token } = req.body;
  const data = jwt.verify(token, JWT_TOKEN);

  try {
    const user = await User.findOne({ id: data.id, "tokens.token": token });

    if (!user) {
      throw new Error("Invalid token.");
    }

    req.user = user;
    req.token = token;

    return next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
