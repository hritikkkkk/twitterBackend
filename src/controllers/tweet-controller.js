const { StatusCodes } = require("http-status-codes");
const { TweetService } = require("../Services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });
const multipleUpload = upload.array("images", 10);

const createTweet = async (req, res) => {
  try {
    multipleUpload(req, res, async function (err) {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: err,
        });
      }

      const payload = { ...req.body };

      if (req.files && req.files.length) {
        payload.images = req.files.map((file) => file.path);
      }

      const tweet = await TweetService.createTweet(payload);

      SuccessResponse.data = tweet;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await TweetService.deleteTweet(req.params.id);
    SuccessResponse.data = tweet;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getTweet = async (req, res) => {
  try {
    const tweet = await TweetService.getTweet(req.params.id);
    SuccessResponse.data = tweet;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAllTweets = async (req, res) => {
  try {
    const tweet = await TweetService.getAllTweets({
      offset: req.params.offset,
      limit: req.params.limit,
    });
    SuccessResponse.data = tweet;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getTweetsByHashtag = async (req, res) => {
  try {
    const tweet = await TweetService.getTweetsByHashtag(req.params.id);
    SuccessResponse.data = tweet;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createTweet,
  deleteTweet,
  getTweet,
  getAllTweets,
  getTweetsByHashtag,
};
