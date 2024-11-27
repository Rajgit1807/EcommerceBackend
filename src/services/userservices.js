const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      throw new Error("user already exist with email :", email);
    }
    password = await bcrypt.hash(password, 8);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId)
    // .populate("address");
    if (!user) {
      throw new Error("user not found by id : ", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("user not found by email : ", email);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const user = findUserById(userId);

    if (!user) {
      throw new Error("user not found by id : ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = UserModel.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
