const express = require("express");

const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.post("/authenticate", userController.getUserByCredentials);
router.post("/register", userController.createUser);
router.get("/:id?", authMiddleware, userController.getUserById);
router.delete("/logout", authMiddleware, userController.removeUserToken);

module.exports = router;
