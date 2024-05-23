const express = require("express");
const { TweetController } = require("../../controllers");
const router = express.Router();

router.post("/", TweetController.createTweet);

router.post("/:id", TweetController.deleteTweet);

module.exports = router;
