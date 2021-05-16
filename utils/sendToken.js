const jwt = require("jsonwebtoken");

// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = jwt.sign({ id: user[0].UID }, process.env.JWT_SECRET, {
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

module.exports = sendTokenResponse;
