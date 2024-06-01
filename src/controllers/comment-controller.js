const { StatusCodes } = require("http-status-codes");
const { CommentService } = require("../Services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const createComment = async (req, res) => {
  try {
    const response = await CommentService.createComment(
      req.query.modelId,
      req.query.modelType,
      req.user.id,
      req.body.content
    );
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getComment = async (req, res) => {
  try {
    const response = await CommentService.getComment(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};
module.exports = {
  createComment,
  getComment,
};
