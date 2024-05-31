const { StatusCodes } = require("http-status-codes");
const { LikeService } = require("../Services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const toggleLike = async (req, res) => {
  try {
    const response = await LikeService.toggleLike(
      req.query.modelId,
      req.query.modelType,
      req.user.id
    );
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  toggleLike,
};
