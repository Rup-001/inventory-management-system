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
  designation: {
    type: String,
    trim: true,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, // Newly registered users are not approved by default
  },
  department: {
    type: String,
    trim: true,
    enum: ['Administration', 'HR', 'Finance', 'Technology', 'Marketing', 'Sales', 'Support'], // Predefined departments
    required: true,
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
    match: /^\S+@\S+\.\S+$/, // Email validation regex
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location", // Reference to Locations collection
    required: function () { return this.designation !== "admin"; }, // Optional for admins
  },
  profileImage: {
    type: String, // Store image data as Base64 string
    required: true
  },
  gender: {
    type: String,
    trim: true,
    enum: ['Male', 'Female'],
    required: true,
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

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; // Exclude password from user object response
  delete user.tokens; // Exclude tokens for security reasons
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
