const express = require("express");
const { TweetController } = require("../../controllers");
const router = express.Router();

router.post("/", TweetController.createTweet);

router.delete("/:id", TweetController.deleteTweet);

router.get("/:id", TweetController.getTweet);

module.exports = router;
