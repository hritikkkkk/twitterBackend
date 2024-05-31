const { StatusCodes } = require("http-status-codes");
const {
  tweetRepository,
  commentRepository,
  likeRepository,
} = require("../../repo");
const AppError = require("../errors/app-error");
const { Enums } = require("../common");
const { TWEET, COMMENT } = Enums.LIKE_TYPE;

const tweetRepo = new tweetRepository();
const commentRepo = new commentRepository();
const likeRepo = new likeRepository();

const getLikeableEntity = async (modelId, modelType) => {
  switch (modelType) {
    case TWEET:
      return await tweetRepo.find(modelId);
    case COMMENT:
      return await commentRepo.find(modelId);
    default:
      throw new AppError("Unknown modelType", StatusCodes.BAD_REQUEST);
  }
};

const checkIfLiked = async (userId, modelId, modelType) => {
  return await likeRepo.findLikedUser({
    user: userId,
    onModel: modelType,
    likeable: modelId,
  });
};

module.exports = {
  getLikeableEntity,
  checkIfLiked,
};
