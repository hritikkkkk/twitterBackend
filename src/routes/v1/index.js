const express = require("express");


const tweetRoutes = require("./tweet-routes");

const router = express.Router();



router.use("/tweets", tweetRoutes);

module.exports = router;
