const express = require("express");

const { postController } = require("../controllers");

const router = express.Router();

router.get("/posts/:id?", postController.getPostById);

module.exports = router;
