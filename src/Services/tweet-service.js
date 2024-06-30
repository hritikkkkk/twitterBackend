const { StatusCodes } = require("http-status-codes");
const { tweetRepository, hastagRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");
const cloudinary = require("cloudinary").v2;
const tweetRepo = new tweetRepository();
const hashtagRepo = new hastagRepository();

const createTweet = async (data) => {
  try {
    const content = data.content;
    const tweet = await tweetRepo.create(data);

    let tags = content.match(/#[a-zA-Z0-9_]+/g);

    if (tags) {
      tags = tags.map((tag) => tag.substring(1).toLowerCase());
      tags = Array.from(new Set(tags));

      const existingHashtags = await hashtagRepo.findByTag(tags);

      const existingTagTitles = new Set(
        existingHashtags.map((tag) => tag.title)
      );

      const newHashtags = tags
        .filter((tag) => !existingTagTitles.has(tag))
        .map((tag) => ({ title: tag, tweets: [tweet.id] }));

      if (newHashtags.length > 0) {
        await hashtagRepo.bulkCreate(newHashtags);
      }

      await Promise.all(
        existingHashtags.map(async (tag) => {
          tag.tweets.push(tweet.id);
          await tag.save();
        })
      );
    }
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

const getTweetsByHashtag = async (id) => {
  try {
    return await hashtagRepo.getTweetsByHashtag(id);
  } catch (error) {
    throw new AppError(
      "cannot fetch the data of hashtags",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateTweet = async (tweetId, data) => {
  try {
    const content = data.content;

    const tweet = await tweetRepo.find(tweetId);
    if (!tweet) throw new AppError("Tweet not found", StatusCodes.NOT_FOUND);

    if (data.images && tweet.images) {
      await Promise.all(
        tweet.images.map(async (imagePath) => {
          const segments = imagePath.split("/");
          const publicIdWithExtension = segments[segments.length - 1];
          const publicId = publicIdWithExtension.split(".")[0];
          await cloudinary.uploader.destroy(`tweets/${publicId}`);
        })
      );
    }
    const updatedTweet = await tweetRepo.update(tweetId, data);

    let newTags = content.match(/#[a-zA-Z0-9_]+/g);

    if (newTags) {
      newTags = newTags.map((tag) => tag.substring(1).toLowerCase());
      newTags = Array.from(new Set(newTags));
    }

    const existingHashtags = await hashtagRepo.findByTag(newTags || []);
    const existingTagTitles = new Set(existingHashtags.map((tag) => tag.title));

    const newHashtags = (newTags || []).filter(
      (tag) => !existingTagTitles.has(tag)
    );
    const newHashtagObjects = newHashtags.map((tag) => ({
      title: tag,
      tweets: [tweet.id],
    }));

    if (newHashtagObjects.length > 0) {
      await hashtagRepo.bulkCreate(newHashtagObjects);
    }
    await Promise.all(
      existingHashtags.map(async (tag) => {
        if (!tag.tweets.includes(tweet.id)) {
          tag.tweets.push(tweet.id);
          await tag.save();
        }
      })
    );

    return updatedTweet;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot update the tweet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createTweet,
  deleteTweet,
  getTweet,
  getAllTweets,
  getTweetsByHashtag,
  updateTweet,
};
