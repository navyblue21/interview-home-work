const mongoose = require("mongoose");
const counter = require("./Counter");

const { Schema, model } = mongoose;

const User = new Schema(
  {
    id: Number,
    username: { type: String, unique: true },
    password: String,
    name: String,
    dob: Date,
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

module.exports = model("users", User);
