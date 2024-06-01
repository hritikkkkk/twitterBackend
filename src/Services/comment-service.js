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

const getComment = async (id) => {
  try {
    return await commentRepo.find(id);
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The comment you requested to is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Failed to get comment",
      StatusCodes.INTERNAL_SERVER_ERROR 
    );
  }
};

module.exports = {
  createComment,
  getComment,
};
