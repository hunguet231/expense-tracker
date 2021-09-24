const express = require("express");

const { getAllTransactionsByUserId } = require("../controllers/users");

const router = express.Router();

const { protect } = require("../middlewares/auth");

router.route("/:userId/transactions").get(protect, getAllTransactionsByUserId);

module.exports = router;
