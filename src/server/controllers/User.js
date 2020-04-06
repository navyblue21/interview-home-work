const User = require("../models/User");
const counter = require("../models/Counter");

const createUser = async (req, res) => {
  const { body } = req;
  const user = new User({ ...body });

  if (!!user === false) {
    return res
      .status(400)
      .json({ success: false, error: "Incorrect userdata" });
  }

  try {
    await user.save();
    return res.status(201).json({ success: true, user });
  } catch (error) {
    // If cannot create user, decrease id by 1
    counter.findOneAndUpdate(
      { name: "user" },
      { $inc: { seq: -1 } },
      (_, doc) => {
        console.info(doc);
      }
    );
    return res.status(400).json({ success: false, error: error.errmsg });
  }
};

const getUserById = async (req, res) => {
  const { id = "" } = req.params;

  if (id) {
    User.find({ id })
      .lean()
      .exec((error, posts) => {
        if (!!posts === false) {
          return res
            .status(401)
            .json({ success: false, error: "Post is unavailable!" });
        }

        if (error) {
          return res.status(400).json({ success: false, error: error.errmsg });
        }

        return res.status(200).json({ success: true, data: posts });
      });
  } else {
    User.find(null, "id username name dob")
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

const getUserByCredentials = (req, res) => {
  const userInfo = req.body;
  const { username, password } = userInfo;

  User.findOne(
    { username, password },
    "username name dob",
    {
      lean: true,
    },
    (error, user) => {
      if (!!user === false) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid login credentials!" });
      }

      if (error) {
        return res.status(400).json({ success: false, error: error.errmsg });
      }

      return res.status(200).json({ success: true, data: user });
    }
  );
};

module.exports = { createUser, getUserById, getUserByCredentials };
