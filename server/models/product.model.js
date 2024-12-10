const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  subcategory: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  model: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  },
  addedBy: {
    username: {
      type: String,
    },
    branch: {
      type: String,
    },
    department: {
      type: String,
    },
  },

  approvedBy: {
    username: {
      type: String,
    },
    branch: {
      type: String,
    },
    department: {
      type: String,
    },
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  purchaseDetails: {
    price: {
      type: Number,
      required: true,
    },
    // dateOfPurchase: {
    //   type: Date,
    //   required: true,
    // },
    buyingMemo: {
      type: String, // Store the file path
      trim: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
