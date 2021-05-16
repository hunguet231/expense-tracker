const express = require("express");

const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middlewares/auth");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

module.exports = router;
