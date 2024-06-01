const { StatusCodes } = require("http-status-codes");
const { userRepository } = require("../repo");
const AppError = require("../utils/errors/app-error");

const userRepo = new userRepository();

const userSignup = async (data) => {
  try {
    const existingUser = await userRepo.existingUser(data.username, data.email);

    if (existingUser) {
      if (
        existingUser.username === data.username &&
        existingUser.email === data.email
      ) {
        throw new AppError(
          `A user with the username '${data.username}' and email '${data.email}' already exists.`,
          StatusCodes.CONFLICT
        );
      } else if (existingUser.username === data.username) {
        throw new AppError(
          `A user with the username '${data.username}' already exists.`,
          StatusCodes.CONFLICT
        );
      }
    }
    const user = await userRepo.create(data);
    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      throw new AppError(
        `A user with the ${field} '${value}' already exists.`,
        StatusCodes.BAD_REQUEST
      );
    } else {
      console.error("Error:", error);
      throw new AppError(
        "Cannot create a new user object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};

const userLogin = async (data) => {
  try {
    const user = await userRepo.login(data.usernameOrEmail);
    if (!user) {
      throw new AppError(
        "No user found for the given username or email",
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
  userLogin,
};
