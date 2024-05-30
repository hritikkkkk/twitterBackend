const { StatusCodes } = require("http-status-codes");
const { userRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");

const userRepo = new userRepository();

const userSignup = async (data) => {
  try {
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      throw new AppError(
        `A user with the ${field} '${value}' already exists.`,
        StatusCodes.BAD_REQUEST
      );
    } else {
      throw new AppError(
        "Cannot create a new user object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};

const userLogin = async (data) => {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No user found for the given email",
        StatusCodes.NOT_FOUND
      );
    }
    if (!user.comparePassword(data.password))
      throw new AppError("Invalid password", StatusCodes.BAD_REQUEST);

    return user.genJWT();
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  userSignup,
  userLogin
};
