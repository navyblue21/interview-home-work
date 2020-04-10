const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema, model } = mongoose;
const JWT_KEY = process.env.JWT_KEY || "thisisasecretkey";

const User = new Schema(
  {
    id: Number,
    username: { type: String, unique: true },
    password: String,
    name: String,
    dob: Date,
    tokenList: [{ token: { type: String, require: true } }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

User.methods.generateAuthToken = async function generateAuthToken() {
  const token = jwt.sign({ id: this.id }, JWT_KEY);
  const { tokenList } = this;

  this.tokenList = tokenList ? this.tokenList.concat({ token }) : [{ token }];

  await this.save();

  return token;
};

module.exports = model("users", User);
