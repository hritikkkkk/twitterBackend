const express = require("express");
const { TweetController } = require("../../controllers");

const router = express.Router();
const { IsAuthenticate } = require("../../middlewares/auth");

router.post("/", IsAuthenticate, TweetController.createTweet);

router.delete("/:id", IsAuthenticate, TweetController.deleteTweet);

router.get("/:id", TweetController.getTweet);

router.get("/", TweetController.getAllTweets);

router.get("/hashtag/:id", TweetController.getTweetsByHashtag);

module.exports = router;
