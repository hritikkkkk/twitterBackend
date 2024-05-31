const express = require("express");

const tweetRoutes = require("./tweet-routes");
const userRoutes = require("./user-routes");
const likeRoutes = require("./like-routes");

const router = express.Router();

router.use("/tweets", tweetRoutes);
router.use("/user", userRoutes);
router.use("/likes",likeRoutes)

module.exports = router;
