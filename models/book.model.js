const mongoose = require("mongoose");

// Defining the schema for a book
const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to a User model's _id
      ref: 'User', // Reference to the User model
      required: true,
    },
    // Title of the book
    title: {
      type: String,
      required: true, // Title is required
      trim: true, // Trim whitespace from the beginning and end of the string
    },
    // Author of the book
    author: {
      type: String,
      required: true, // Author name is required
      trim: true, // Trim whitespace from the beginning and end of the string
    },
    // Description of the book
    description: {
      type: String,
      required: true, // Description is required
    },
    // Published year of the book
    publishedYear: {
      type: Number, // Published year represented as a number
      required: true, // Published year is required
      validate: {
        // Custom validator to ensure a valid year value
        validator: function (value) {
          // Add specific validation logic here
          // For example, checking if it's a valid year or falls within a range
          return value && Number.isInteger(value) && value > 0; // Validating if it's a positive integer
        },
        message: props => `${props.value} is not a valid year!`, // Error message for validation failure
      },
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create a Book model based on the defined schema
const Book = mongoose.model("Book", bookSchema);

// Export the Book model
module.exports = Book;
