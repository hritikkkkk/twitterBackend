const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.js");
const { JWT_SECRET } = require("./server-config");
const AppError = require("../utils/errors/app-error.js");
const { ErrorResponse } = require("../utils/common/index.js");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwtPayload, callback) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (!user) return callback(null, false);
    return callback(null, user);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching user in jwt startegy";
    ErrorResponse.error = new AppError(
      ["Unauthorised jwt"],
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    return callback(ErrorResponse, false);
  }
});

const passportAuth = (passport) => {
  passport.use(jwtStrategy);
};

module.exports = {
  passportAuth,
};
