const { StatusCodes } = require("http-status-codes");
const { TweetService } = require("../Services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createTweet = async (req, res) => {
  try {
    const tweet = await TweetService.createTweet({
      content: req.body.content,
    });
    console.log(tweet);
    SuccessResponse.data = tweet;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
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

module.exports = {
  createTweet,
  deleteTweet,
  getTweet,
  getAllTweets,
};
