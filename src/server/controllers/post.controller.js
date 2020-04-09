const Post = require("../models/Post");
// const counter = require("../models/Counter");

const getPostById = async (req, res) => {
  const { id = "" } = req.params;

  if (id) {
    Post.find({ id }, (error, posts) => {
      if (!!posts === false) {
        return res
          .status(401)
          .json({ success: false, error: "Post is unavailable!" });
      }

      if (error) {
        return res.status(400).json({ success: false, error: error.errmsg });
      }

      return res.status(200).json({ success: true, data: posts });
    }).lean();
  } else {
    Post.find()
      .lean()
      .exec((error, postList) => {
        if (!!postList === false) {
          return res
            .status(401)
            .json({ success: false, error: "No post available!" });
        }

        if (error) {
          return res.status(400).json({ success: false, error: error.errmsg });
        }

        return res.status(200).json({ success: true, data: postList });
      });
  }
};

module.exports = { getPostById };
