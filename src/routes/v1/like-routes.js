const express = require("express");
const { LikeController } = require("../../controllers");
const { IsAuthenticate } = require("../../middlewares/auth");

const router = express.Router();

router.post("/toggle", IsAuthenticate, LikeController.toggleLike);

module.exports = router;
