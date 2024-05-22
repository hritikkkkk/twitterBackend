const { StatusCodes } = require("http-status-codes");
const {TweetService} = require("../Services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createTweet = async (req, res) => {
  try {
    const tweet = await TweetService.createTweet({
      content: req.body.content,
    });
    console.log(tweet)
      SuccessResponse.data = tweet;
     
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  createTweet,
};
