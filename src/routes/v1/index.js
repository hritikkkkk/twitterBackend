const express = require("express");

const tweetRoutes = require("./tweet-routes");
const userRoutes = require("./user-routes");
const likeRoutes = require("./like-routes");
const commentRoutes = require("./comment-routes");
const router = express.Router();

router.use("/tweets", tweetRoutes);
router.use("/user", userRoutes);
router.use("/likes", likeRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
