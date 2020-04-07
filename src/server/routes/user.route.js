const express = require("express");

const { userController } = require("../controllers");

const router = express.Router();

router.post("/authenticate", userController.getUserByCredentials);
router.post("/register", userController.createUser);
router.get("/:id?", userController.getUserById);

module.exports = router;
