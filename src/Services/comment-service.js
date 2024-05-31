const { StatusCodes } = require("http-status-codes");
const { commentRepository } = require("../repo");
const { likeHelper } = require("../utils/helper");
const AppError = require("../utils/errors/app-error");

const commentRepo = new commentRepository();

const createComment = async (modelId, modelType, userId, content) => {
  try {
    const commentable = await likeHelper.getLikeableEntity(modelId, modelType);

    const commentData = {
      content,
      userId,
      onModel: modelType,
      commentable: modelId,
      comments: [],
    };

    const comment = await commentRepo.create(commentData);
    commentable.comments.push(comment);
    await commentable.save();
    return comment;
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to create comment", StatusCodes.FORBIDDEN);
  }
};

module.exports = {
  createComment,
};
