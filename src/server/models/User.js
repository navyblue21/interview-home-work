const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const counter = require("./Counter");

const { Schema, model } = mongoose;
const JWT_KEY = process.env.JWT_KEY || "thisisasecretkey";

const User = new Schema(
  {
    id: Number,
    username: { type: String, unique: true },
    password: String,
    name: String,
    dob: Date,
    token: [{ token: { type: String, require: true } }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

User.pre("save", function autoIncrementId(next) {
  const user = this;

  counter.findOneAndUpdate(
    { name: "user" },
    { $inc: { seq: 1 } },
    (error, counterDocument) => {
      if (error) {
        return next(error);
      }
      user.id = counterDocument.seq + 1;

      return next();
    }
  );
});

User.methods.generateAuthToken = async function generateAuthToken() {
  const token = jwt.sign({ id: this.id }, JWT_KEY);
  this.token = this.token.concat({ token });

  await this.save();

  return token;
};

module.exports = model("users", User);
