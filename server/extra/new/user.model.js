
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
   
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    required: true,
  },

  isApproved: {
    type: Boolean,
    default: false, // Newly registered users are not approved by default
  },
  
  department: {
    type: String,
    trim: true,
  },

  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },

  phoneNumber: {
    type: String,
    trim: true,
  },

  address: {
    city: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("user", userSchema);
module.exports = User;