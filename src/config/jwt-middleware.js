const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user.js");
const { JWT_SECRET } = require("./server-config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwtPayload, callback) => {
  try {
    if (Date.now() >= jwtPayload.exp * 1000) {
      const error = new Error("Token has expired");
      error.name = "TokenExpiredError";
      return callback(error, false);
    }

    const user = await User.findById(jwtPayload.id);
    if (!user) return callback(null, false);

    return callback(null, user);
  } catch (error) {
    return callback(error, false);
  }
});

const passportAuth = (passport) => {
  passport.use(jwtStrategy);
};

module.exports = {
  passportAuth,
};
