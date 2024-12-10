const mongoose = require("mongoose")
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
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 0,
        required: true
      },
      manufacturer: {
        type: String,
        trim: true,
        required: true
      },
      image:{
        type: String,
        require : true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});
const product = mongoose.model("product", productSchema)
module.exports = product;