const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../Services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

const userSignup = async (req, res) => {
  try {
    const response = await UserService.userSignup({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const userLogin = async (req, res) => {
  try {
    const response = await UserService.userLogin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  userSignup,
  userLogin
};
