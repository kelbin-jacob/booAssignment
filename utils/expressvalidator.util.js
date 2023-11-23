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

  // Validation for book descripition
  body("description")
    .notEmpty()
    .withMessage({
      errorCode: ERROR_CODES.DESCRIPITION_IS_REQUIRED,
      message: ERROR_MESSAGES.DESCRIPITION_IS_REQUIRED,
    })
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.DESCRIPITION_MUST_BE_STRING,
      message: ERROR_MESSAGES.DESCRIPITION_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage({
      errorCode: ERROR_CODES.DESCRIPITION_MUST_BE_LESSTHAN_251,
      message: ERROR_MESSAGES.DESCRIPITION_MUST_BE_LESSTHAN_251,
    }),
  body("publishedYear")
    .notEmpty()
    .withMessage({
      errorCode: ERROR_CODES.PUBLISHEDYEAR_IS_REQUIRED,
      message: ERROR_MESSAGES.PUBLISHEDYEAR_IS_REQUIRED,
    })
    .isNumeric()
    .withMessage({
      errorCode: ERROR_CODES.PUBLISHEDYEAR_MUST_BE_NUMBER,
      message: ERROR_MESSAGES.PUBLISHEDYEAR_MUST_BE_NUMBER,
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
  body("description")
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.DESCRIPITION_MUST_BE_STRING,
      message: ERROR_MESSAGES.DESCRIPITION_MUST_BE_STRING,
    })
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage({
      errorCode: ERROR_CODES.DESCRIPITION_MUST_BE_LESSTHAN_251,
      message: ERROR_MESSAGES.DESCRIPITION_MUST_BE_LESSTHAN_251,
    }),
    body("publishedYear")
    .isNumeric()
    .withMessage({
      errorCode: ERROR_CODES.PUBLISHEDYEAR_MUST_BE_NUMBER,
      message: ERROR_MESSAGES.PUBLISHEDYEAR_MUST_BE_NUMBER,
    }),
];

const adduser = [
  body("name")
    .notEmpty()
    .withMessage({
      errorCode: ERROR_CODES.NAME_IS_REQUIRED,
      message: ERROR_MESSAGES.NAME_IS_REQUIRED,
    })
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.NAME_MUST_BE_STRING,
      message: ERROR_MESSAGES.NAME_MUST_BE_STRING,
    })
    .trim()

    .isLength({ min: 3, max: 25 })
    .withMessage({
      errorCode: ERROR_CODES.NAME_MUST_BE_LESSTHAN_25,
      message: ERROR_MESSAGES.NAME_MUST_BE_LESSTHAN_25,
    }),
    body("password")
    .notEmpty()
    .withMessage({
      errorCode: ERROR_CODES.PASSWORD_IS_REQUIRED,
      message: ERROR_MESSAGES.PASSWORD_IS_REQUIRED,
    })
    .isString()
    .withMessage({
      errorCode: ERROR_CODES.PASSWORD_MUST_BE_STRING,
      message: ERROR_MESSAGES.PASSWORD_MUST_BE_STRING,
    })
    .trim()

    .isLength({ min: 8, max: 16 })
    .withMessage({
      errorCode: ERROR_CODES.PASSWORD_MUST_BE_LESSTHAN_17,
      message: ERROR_MESSAGES.PASSWORD_MUST_BE_LESSTHAN_17,
    }),

]

module.exports = {
  addBook,
  updateBook,
  adduser
};
