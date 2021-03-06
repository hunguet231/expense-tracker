const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
require("dotenv").config();

// protect route
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // make sure token exists
  if (!token) {
    return next(
      new ErrorResponse(`Not authorize to access this route, no token`, 401)
    );
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [data] = await User.getSingleById(decoded.id);
    req.user = data[0];

    next();
  } catch (error) {
    return next(new ErrorResponse(`Not authorize to access this route`, 401));
  }
});

// grant access to specific roles
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorResponse(
//           `User role ${req.user.role} is not authorized to access this route`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };
