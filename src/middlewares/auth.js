const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const passport = require("passport");

const IsAuthenticate = (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (err) {
      return next(err);
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
