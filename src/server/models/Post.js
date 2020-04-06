const mongoose = require("mongoose");
const counter = require("./Counter");

const { Schema, model } = mongoose;

const Post = new Schema(
  {
    id: Number,
    owner: Number,
    title: String,
    content: String,
    tags: [String],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

Post.pre("save", function autoIncrementId(next) {
  const post = this;

  counter.findOneAndUpdate(
    { name: "post" },
    { $inc: { seq: 1 } },
    (error, counterDocument) => {
      if (error) {
        return next(error);
      }
      post.id = counterDocument.seq + 1;

      return next();
    }
  );
});

module.exports = model("posts", Post);
