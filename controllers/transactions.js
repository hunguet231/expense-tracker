const Transaction = require("../models/Transaction");

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const [transactions] = await Transaction.getAll();
    res.status(200).json(transactions);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// @desc    Get single transaction by ID
// @route   GET /api/v1/transactions/:id
// @access  Private
exports.getTransaction = async (req, res, next) => {
  try {
    const [transaction] = await Transaction.getSingle(req.params.id);
    res.status(200).json(transaction);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// @desc    Add a single transaction
// @route   POST /api/v1/transactions
// @access  Private
exports.createTransaction = async (req, res, next) => {
  try {
    const [transaction] = await Transaction.create(req.body, req.user.id);
    res.status(200).json(transaction);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// @desc    Update single transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
exports.updateTransaction = async (req, res, next) => {
  try {
    const [transaction] = await Transaction.update(req.params.id, req.body);
    res.status(200).json(transaction);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// @desc    Delete single transaction by ID
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res, next) => {
  try {
    await Transaction.deleteById(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
