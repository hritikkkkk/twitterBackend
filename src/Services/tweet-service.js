const { StatusCodes } = require("http-status-codes");
const { tweetRepository, hastagRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");

const tweetRepo = new tweetRepository();
const hashtagRepo = new hastagRepository();

const createTweet = async (data) => {
  try {
    const content = data.content;
    let tags = content.match(/#[a-zA-Z0-9_]+/g).map((tag) => tag.substring(1));

    const tweet = await tweetRepo.create(data);

    let existingtags = await hashtagRepo.findByTag(tags);
    let presentTags = existingtags.map((tag) => tag.title);

    //  new hashtags
    let newTags = tags
      .filter((tag) => !presentTags.includes(tag))
      .map((tag) => ({ title: tag, tweets: [tweet.id] }));

    if (newTags.length > 0) await hashtagRepo.bulkCreate(newTags);

    // Update existing hashtags with the new tweet ID
    existingtags.forEach(async (tag) => {
      tag.tweets.push(tweet.id);
      await tag.save();
    });

    return tweet;
  } catch (error) {
    throw new AppError(
      "cannot create a new tweet",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createTweet,
};
