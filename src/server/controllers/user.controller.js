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
    counter.findOneAndUpdate(
      { name: "user" },
      { $inc: { seq: 1 } },
      (error, counterDocument) => {
        user.id = counterDocument.seq + 1;
      }
    );
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

const getUserByCredentials = (req, res) => {
  const userInfo = req.body;
  const { username, password } = userInfo;

  User.findOne(
    { username, password },
    "id username name dob",
    async (error, user) => {
      if (!!user === false) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid login credentials!" });
      }

      if (error) {
        return res.status(400).json({ success: false, error: error.errmsg });
      }

      try {
        const token = await user.generateAuthToken();

        return res.status(200).json({ success: true, data: { user, token } });
      } catch (tokenError) {
        return res.status(500).json({ success: false, error: tokenError });
      }
    }
  );
};

const getUserById = async (req, res) => {
  const { id = "" } = req.body;

  if (id) {
    User.find({ id }, "id username name dob")
      .lean()
      .exec((error, user) => {
        if (!!user === false) {
          return res
            .status(401)
            .json({ success: false, error: "User is unavailable!" });
        }

        if (error) {
          return res.status(400).json({ success: false, error: error.errmsg });
        }

        return res.status(200).json({ success: true, data: user });
      });
  } else {
    User.find(null, "id username name dob")
      .lean()
      .exec((error, userList) => {
        if (!!userList === false) {
          return res
            .status(401)
            .json({ success: false, error: "No user available!" });
        }

        if (error) {
          return res.status(400).json({ success: false, error: error.errmsg });
        }

        return res.status(200).json({ success: true, data: userList });
      });
  }
};

const removeUserToken = async (req: Request, res: Response) => {
  try {
    const { tokenList } = req.user;
    req.user.tokenList = tokenList.filter(({ token }) => token !== req.token);
    await req.user.save();

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByCredentials,
  removeUserToken,
};
