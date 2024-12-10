const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  contactInfo: {
    type: String,
    required: true,
    trim: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
