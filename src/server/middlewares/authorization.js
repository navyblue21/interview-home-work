const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_TOKEN = process.env.JWT_KEY || "thisisasecretkey";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, JWT_TOKEN);

    return User.findOne({ id: data.id, "tokenList.token": token }).exec(
      (err, user) => {
        if (!!user === false) {
          return next(new Error("Invalid token."));
        }

        req.user = user;
        req.token = token;

        return next();
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: error.errmsg });
  }
};

module.exports = auth;
