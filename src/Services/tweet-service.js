const { StatusCodes } = require("http-status-codes");
const { tweetRepository, hastagRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");

const tweetRepo = new tweetRepository();
const hashtagRepo = new hastagRepository();

const createTweet = async (data) => {
  try {
    const content = data.content;

    // Create the tweet first
    const tweet = await tweetRepo.create(data);

    // Extract hashtags
    let tags = content.match(/#[a-zA-Z0-9_]+/g);

    if (tags) {
      // Normalize tags to lowercase and remove the hash symbol
      tags = tags.map((tag) => tag.substring(1).toLowerCase());

      // Remove duplicate tags
      tags = Array.from(new Set(tags));

      // Find existing hashtags
      const existingHashtags = await hashtagRepo.findByTag(tags);
      const existingTagTitles = new Set(
        existingHashtags.map((tag) => tag.title)
      );

      // Determine new hashtags
      const newHashtags = tags
        .filter((tag) => !existingTagTitles.has(tag))
        .map((tag) => ({ title: tag, tweets: [tweet.id] }));

      // Bulk create new hashtags if any
      if (newHashtags.length > 0) {
        await hashtagRepo.bulkCreate(newHashtags);
      }

      // Update existing hashtags with the new tweet ID
      await Promise.all(
        existingHashtags.map(async (tag) => {
          tag.tweets.push(tweet.id);
          await tag.save();
        })
      );
    }

    // Return the created tweet
    return tweet;
  } catch (error) {
    throw new AppError(
      "Cannot create a new tweet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteTweet = async (id) => {
  try {
    const tweet = await tweetRepo.destroy(id);
    return tweet;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The tweet you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "cannot fetch the data of given tweet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getTweet = async (id) => {
  try {
    const tweet = tweetRepo.getWithComments(id);
    return tweet;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The tweet you requested to is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "cannot fetch the data of given tweet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllTweets = async (offset, limit) => {
  try {
    return await tweetRepo.getAllTweets(offset, limit);
  } catch (error) {
    throw new AppError(
      "cannot fetch the data of tweets",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createTweet,
  deleteTweet,
  getTweet,
  getAllTweets,
};
