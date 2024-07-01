const express = require("express");
const { TweetController } = require("../../controllers");

const router = express.Router();
const { IsAuthenticate,isOwner } = require("../../middlewares/auth");

router.post("/", IsAuthenticate, TweetController.createTweet);

router.delete("/:id", IsAuthenticate,isOwner, TweetController.deleteTweet);

router.get("/:id", TweetController.getTweet);

router.get("/", TweetController.getAllTweets);

router.get("/hashtag/:id", TweetController.getTweetsByHashtag);

router.put("/:id", IsAuthenticate,isOwner, TweetController.updateTweet );

module.exports = router;
