const Transaction = require("../models/Transaction");

// @desc    Get all transactions by UID
// @route   GET /api/v1/users/:userId/transactions
// @access  Private
exports.getAllTransactionsByUserId = async (req, res, next) => {
  try {
    const [transactions] = await Transaction.getAllByUserId(req.params.userId);
    res.status(200).json(transactions);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
