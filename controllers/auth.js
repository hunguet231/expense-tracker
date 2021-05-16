const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const sendTokenResponse = require("../utils/sendToken");
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
    throw new Error("Tài khoản này đã tồn tại");
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
    throw new Error("Tài khoản này không tồn tại");
  }

  // check if password matches
  const isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    throw new Error("Mật khẩu sai");
  }

  // send token back
  sendTokenResponse(user, 200, res);
});

// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const [user] = await User.getSingleById(req.user.UID);

  if (user.length) {
    sendTokenResponse(user, 200, res);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const [data] = await User.getSingleById(req.user.UID);
  let user = data[0];

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.birthday = req.body.birthday || user.birthday;
    user.sex = req.body.sex || user.sex;
    user.address = req.body.address || user.address;
    user.balance = req.body.balance || user.balance;
    user.username = req.body.username || user.username;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const {
      firstName,
      lastName,
      birthday,
      sex,
      address,
      balance,
      username,
      password,
    } = user;

    const [updatedUser] = await User.update([
      firstName,
      lastName,
      birthday,
      sex,
      address,
      balance,
      username,
      password,
    ]);

    sendTokenResponse(updatedUser, 200, res);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
