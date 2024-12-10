const mongoose = require("mongoose");

const inventoryHistorySchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventType: {
    type: String,
    enum: ["assigned", "returned", "transferred_out", "transferred_in"],
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const InventoryHistory = mongoose.model("InventoryHistory", inventoryHistorySchema);

module.exports = InventoryHistory;
