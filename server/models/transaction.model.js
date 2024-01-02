const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['request', 'return', 'purchase'],
    required: true,
  },
  specification: {
    type: String,
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
  requestStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
  },
  returnStatus: {
    type: String,
    enum: ['pending', 'completed'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
