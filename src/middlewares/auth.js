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

module.exports = {
  IsAuthenticate,
};
