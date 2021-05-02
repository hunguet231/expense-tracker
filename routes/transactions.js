const express = require("express");

const {
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  createTransaction,
} = require("../controllers/transactions");

const router = express.Router();

const { protect } = require("../middlewares/auth");

router
  .route("/")
  .get(protect, getTransactions)
  .post(protect, createTransaction);

router
  .route("/:id")
  .get(protect, getTransaction)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
