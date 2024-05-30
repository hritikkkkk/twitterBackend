const express = require("express");

const tweetRoutes = require("./tweet-routes");
const userRoutes = require("./user-routes");

const router = express.Router();

router.use("/tweets", tweetRoutes);
router.use("/user", userRoutes);

module.exports = router;
