const Book = require("../models/book.model");
const ERROR_CODES = require("../utils/errorcodes.utils");
const ERROR_MESSAGES = require("../utils/errormessages.utils");
const logger = require("../utils/loggerfile.utils");
const { validationResult } = require("express-validator");

const bookController = {
  // Add a new book
  addBook: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.errors[0].msg);
      }
      // Extract data from request body

      const { title, author, summary } = req.body;

      // Create a new Book instance
      const newBook = new Book({ title, author, summary });

      // Save the new book to the database
      await newBook.save();

      // Respond with the created book
      return res.status(200).json(newBook);
    } catch (err) {
      // Handle error if save operation fails
      logger.error("Error In catch:", err);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },

  // Get all books
  getAllBooks: async (req, res) => {
    try {
      // Retrieve all books from the database
      const books = await Book.find();

      // Respond with the list of books
      return res.status(200).json(books);
    } catch (err) {
      // Handle error if retrieval fails
      logger.error("Error In catch:", err);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },

  // Get a specific book by ID
  getBookById: async (req, res) => {
    try {
      // Find a book by its ID
      const book = await Book.findById(req.params.id);

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
    } catch (err) {
      // Handle error if retrieval fails
      logger.error("Error In catch:", err);
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
      // Extract data from request body
      const { title, author, summary } = req.body;

      // Find and update a book by its ID
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, summary },
        { new: true }
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
    } catch (err) {
      // Handle error if update operation fails
      logger.error("Error In catch:", err);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },

  // Delete a book
  deleteBook: async (req, res) => {
    try {
      // Find and delete a book by its ID
      const deletedBook = await Book.findByIdAndDelete(req.params.id);

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
    } catch (err) {
      // Handle error if deletion fails
      logger.error("Error In catch:", err);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  },
};

module.exports = bookController;
