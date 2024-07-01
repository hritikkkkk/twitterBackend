const tweet = require("../models/tweet");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const passport = require("passport");

const IsAuthenticate = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info && info.name === "TokenExpiredError") {
      ErrorResponse.message = "Token has expired";
      ErrorResponse.error = new AppError(
        ["Token has expired"],
        StatusCodes.UNAUTHORIZED
      );
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    if (!user) {
      ErrorResponse.message = "Something went wrong while authenticating user";
      ErrorResponse.error = new AppError(
        ["Unauthorised access"],
        StatusCodes.UNAUTHORIZED
      );

      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }
    req.user = user;
    next();
  })(req, res, next);
};

const isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Tweet = await tweet.findById(id);

    if (!Tweet)
      throw new AppError("tweet does not exist", StatusCodes.NOT_FOUND);

    if (!Tweet.owner.equals(req.user._id))
      throw new AppError(
        "You are not authorized to update or delete this tweet",
        StatusCodes.UNAUTHORIZED
      );

    next();
  } catch (error) {
    console.error(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

module.exports = {
  IsAuthenticate,
  isOwner,
};
