const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  let {
    firstName,
    lastName,
    birthday,
    sex,
    address,
    balance,
    username,
    password,
  } = req.body;

  // check if username already exists
  const [userExists] = await User.getSingleByUsername(username);
  if (userExists.length) {
    res.status(400);
    throw new Error("This account already exists");
    // res.send(userExists);
  }

  // hash password before store to DB
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  // create new user
  const [user] = await User.create([
    firstName,
    lastName,
    birthday,
    sex,
    address,
    balance,
    username,
    password,
  ]);

  // send token back
  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // check for user
  const [user] = await User.getSingleByUsername(username);

  if (!user.length) {
    res.status(401);
    throw new Error("This account does not exist");
  }

  // check if password matches
  const isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    throw new Error("Wrong password");
  }

  // send token back
  sendTokenResponse(user, 200, res);
});

// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = jwt.sign({ UID: user.UID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  const {
    UID,
    firstName,
    lastName,
    birthday,
    sex,
    role,
    address,
    balance,
    username,
  } = user[0];

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: {
      UID,
      firstName,
      lastName,
      birthday,
      sex,
      role,
      address,
      balance,
      username,
    },
    token,
  });
};
