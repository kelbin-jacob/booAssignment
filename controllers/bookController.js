const Book = require("../models/book.model");
const ERROR_CODES = require("../utils/errorcodes.utils");
const ERROR_MESSAGES = require("../utils/errormessages.utils");
const logger = require("../utils/loggerfile.utils");
const { validationResult } = require("express-validator");

const bookController = {
  // Add a new book
  addBook: async (req, res) => {
    try {
      const userId = req.currentUserObj.userID;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.errors[0].msg);
      }
      // Extract data from request body

      const { title, author, description, publishedYear } = req.body;

      // Create a new Book instance
      const newBook = new Book({
        title,
        author,
        description,
        publishedYear,
        userId,
      });

      // Save the new book to the database
      await newBook.save();

      // Respond with the created book
      return res.status(200).json(newBook);
    } catch (error) {
      // Handle error if save operation fails
      logger.error("Error In catch:", error);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },

  // Get all books
  getAllBooks: async (req, res) => {
    try {
      const userId = req.currentUserObj.userID; // Extracting current user ID from request object
      const page = parseInt(req.query.page) || 1; // Page number for pagination, default to 1
      const limit = parseInt(req.query.limit) || 10; // Number of books per page, default to 10

      // Finding total count of books with applied filters for a specific user
      const totalBooksCount = await Book.countDocuments({ userId });

      // Applying pagination and retrieving books for a specific user
      const books = await Book.find({ userId })
        .skip((page - 1) * limit)
        .limit(limit);

      // Checking if there are more items available
      const hasNext = totalBooksCount > page * limit;

      // Responding with the list of books, metadata, and pagination details
      return res.status(200).json({
        books,
        data: {
          dataCount: books.length,
          totalDataCount: totalBooksCount,
          hasNext,
        },
      });
    } catch (error) {
      // Handling error if retrieval fails and logging the error
      console.error("Error:", error); // Change 'logger.error' to 'console.error' for demonstration
      return res.status(500).json({
        errorCode: "UNEXPECTED_ERROR", // Replace with your actual error codes
        message: "An unexpected error occurred.", // Replace with your actual error message
      });
    }
  },

  // Get a specific book by ID
  getBookById: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.currentUserObj.userID;
      // Find a book by its ID
      const book = await Book.findOne({ _id: id, userId: userId });

      if (book) {
        // Respond with the found book
        return res.status(200).json(book);
      } else {
        // Handle case when book is not found
        return res.status(400).json({
          errorCode: ERROR_CODES.BOOK_NOT_FOUND,
          message: ERROR_MESSAGES.BOOK_NOT_FOUND,
        });
      }
    } catch (error) {
      console.log(error, "err");
      // Handle error if retrieval fails
      logger.error("Error In catch:", error);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },

  // Update a book's details
  updateBook: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.errors[0].msg);
      }
      const id = req.params.id;
      const userId = req.currentUserObj.userID;
      // Extract data from request body
      const { title, author, description, publishedYear } = req.body;

      // Find and update a book by its ID
      const updatedBook = await Book.findOneAndUpdate(
        { _id: id, userId: userId }, // Query to find the book by both ID and userId
        { title, author, description, publishedYear }, // Update with the new values
        { new: true } // Return the updated document
      );

      if (updatedBook) {
        // Respond with the updated book
        return res.status(200).json(updatedBook);
      } else {
        // Handle case when book is not found
        return res.status(400).json({
          errorCode: ERROR_CODES.BOOK_NOT_FOUND,
          message: ERROR_MESSAGES.BOOK_NOT_FOUND,
        });
      }
    } catch (error) {
      // Handle error if update operation fails
      logger.error("Error In catch:", error);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },

  // Delete a book
  deleteBook: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.currentUserObj.userID;
      // Find and delete a book by its ID
      const deletedBook = await Book.findOneAndDelete({
        _id: id,
        userId: userId,
      });

      if (deletedBook) {
        // Respond indicating successful deletion
        return res.status(200).json({ message: "Book deleted" });
      } else {
        // Handle case when book is not found
        return res.status(400).json({
          errorCode: ERROR_CODES.BOOK_NOT_FOUND,
          message: ERROR_MESSAGES.BOOK_NOT_FOUND,
        });
      }
    } catch (error) {
      // Handle error if deletion fails
      logger.error("Error In catch:", error);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },
};
// Function to escape special characters in the input string
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = bookController;
