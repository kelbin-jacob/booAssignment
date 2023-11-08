const { body } = require("express-validator");
const ERROR_CODES = require("../utils/errorcodes.utils");
const ERROR_MESSAGES = require("../utils/errormessages.utils");

// Validation middleware for adding a book
const addBook = [
  // Validation for book title
  body("title")
    .notEmpty()
    .withMessage({
      errorCode: ERROR_CODES.TITLE_IS_REQUIRED,
      message: ERROR_MESSAGES.TITLE_IS_REQUIRED,
    })
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.TITLE_MUST_BE_STRING,
      message: ERROR_MESSAGES.TITLE_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage({
      errorCode: ERROR_CODES.TITLE_MUST_BE_LESSTHAN_15,
      message: ERROR_MESSAGES.TITLE_MUST_BE_LESSTHAN_15,
    }),

  // Validation for book author
  body("author")
    .notEmpty()
    .withMessage({
      errorCode: ERROR_CODES.AUTHOR_IS_REQUIRED,
      message: ERROR_MESSAGES.AUTHOR_IS_REQUIRED,
    })
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.AUTHOR_MUST_BE_STRING,
      message: ERROR_MESSAGES.AUTHOR_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 2, max: 25 })
    .withMessage({
      errorCode: ERROR_CODES.AUTHOR_MUST_BE_LESSTHAN_25,
      message: ERROR_MESSAGES.AUTHOR_MUST_BE_LESSTHAN_25,
    }),

  // Validation for book summary
  body("summary")
    .notEmpty()
    .withMessage({
      errorCode: ERROR_CODES.SUMMARY_IS_REQUIRED,
      message: ERROR_MESSAGES.SUMMARY_IS_REQUIRED,
    })
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.SUMMARY_MUST_BE_STRING,
      message: ERROR_MESSAGES.SUMMARY_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage({
      errorCode: ERROR_CODES.SUMMARY_MUST_BE_LESSTHAN_251,
      message: ERROR_MESSAGES.SUMMARY_MUST_BE_LESSTHAN_251,
    }),
];

// Validation middleware for updating a book
const updateBook = [
  // Validation for updated book title
  body("title")
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.TITLE_MUST_BE_STRING,
      message: ERROR_MESSAGES.TITLE_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage({
      errorCode: ERROR_CODES.TITLE_MUST_BE_LESSTHAN_15,
      message: ERROR_MESSAGES.TITLE_MUST_BE_LESSTHAN_15,
    }),

  // Validation for updated book author
  body("author")
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.AUTHOR_MUST_BE_STRING,
      message: ERROR_MESSAGES.AUTHOR_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 2, max: 25 })
    .withMessage({
      errorCode: ERROR_CODES.AUTHOR_MUST_BE_LESSTHAN_25,
      message: ERROR_MESSAGES.AUTHOR_MUST_BE_LESSTHAN_25,
    }),

  // Validation for updated book summary
  body("summary")
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.SUMMARY_MUST_BE_STRING,
      message: ERROR_MESSAGES.SUMMARY_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage({
      errorCode: ERROR_CODES.SUMMARY_MUST_BE_LESSTHAN_251,
      message: ERROR_MESSAGES.SUMMARY_MUST_BE_LESSTHAN_251,
    }),
];

module.exports = {
  addBook,
  updateBook,
};
