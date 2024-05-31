const { StatusCodes } = require("http-status-codes");
const { likeRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");

const { likeHelper } = require("../utils/helper");

const likeRepo = new likeRepository();

const toggleLike = async (modelId, modelType, userId) => {
  try {
    const likeable = await likeHelper.getLikeableEntity(modelId, modelType);
    const isLiked = await likeHelper.checkIfLiked(userId, modelId, modelType);

    if (isLiked) {
      likeable.likes.pull(isLiked.id);
      await likeable.save();
      console.log(isLiked);
      await isLiked.deleteOne();
    } else {
      const newLike = await likeRepo.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
    }

    return !isLiked; // Returns true if like was added, false if removed
  } catch (error) {
    console.log("Error in LikeService: ", error.message);
    throw new AppError("Failed to toggle like", StatusCodes.FORBIDDEN);
  }
};

module.exports = {
  toggleLike,
};
