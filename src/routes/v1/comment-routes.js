const express = require("express");
const { CommentController } = require("../../controllers");
const { IsAuthenticate } = require("../../middlewares/auth");

const router = express.Router();

router.post("/", IsAuthenticate, CommentController.createComment);

module.exports = router;