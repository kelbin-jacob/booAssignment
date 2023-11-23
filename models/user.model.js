const mongoose = require("mongoose");

// Defining the schema for the user
const userSchema = new mongoose.Schema(
  {
    // User's name field
    name: {
      type: String,
      required: true, // Name is required
      trim: true, // Trim whitespace from the beginning and end of the string
    },
    // User's password field
    password: {
      type: String,
      required: true, // Password is required
      trim: true, // Trim whitespace from the beginning and end of the string
    },
    // Status of the user, e.g., "active", "inactive"
    status: {
      type: Number,
      required: true, // Status is required
    },
    // Role of the user, e.g., "admin", "user", etc.
    role: {
      type: Number,
      required: true, // Role is required
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create a User model based on the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
