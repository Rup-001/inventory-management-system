const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fromBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  toBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  transferDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  approvalDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    required: true,
  },
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
