const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  returnedDate: {
    type: Date,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  currentStatus: {
    type: String,
    enum: ["assigned", "returned", "return_confirmed",  "in_transfer", "pending"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
