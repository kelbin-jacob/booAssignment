const User = require("../models/user.model");

const { validationResult } = require("express-validator");

const ERROR_CODES = require("../utils/errorcodes.utils");
const ERROR_MESSAGES = require("../utils/errormessages.utils");
const logger = require("../utils/loggerfile.utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Return validation error
        return res.status(400).send(errors.errors[0].msg);
      }
  
      // Extract necessary fields from the request body
      const { name, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 8);
  
      // Create a new user in the database
      const newUser = await User.create({
        name,
        password: hashedPassword,
        role: 1, // Assuming default role value or it's coming from the request
        status:1, // Assuming you have a predefined enum-like object for statuses
      });
  
      // Return the created user upon success
      return res.status(200).send(newUser);
    } catch (error) {
      // Log and handle unexpected errors
      logger.error('Error during user creation:', error);
    }
  };


//  LOGIN
const login = async (req, res, next) => {
    try {
      // Validate incoming request data
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // Return validation error response
        const errorResponse = {
          errorCode: errors.errors[0].msg.errorCode,
          message: errors.errors[0].msg.message,
        };
        return res.status(errorResponse.errorCode).json(errorResponse);
      }
  
      // Find the user in the database by name
      const user = await User.findOne({ name: req.body.name });
  
      // If user not found, return 404 response
      if (!user) {
        const userNotFoundResponse = {
          errorCode: ERROR_CODES.USER_NOT_FOUND,
          message: ERROR_MESSAGES.USER_NOT_FOUND,
        };
        return res.status(404).json(userNotFoundResponse);
      }
  
      // Check if the provided password is valid
      const validPassword = await bcrypt.compare(req.body.password, user.password);
  
      if (validPassword) {
        // Generate access and refresh tokens
        const token = generateAccessToken(user.id, user.name, req.body.password);
        const refreshToken = generateRefreshToken(user.id, user.name, req.body.password);
  
        // Prepare success response
        const successResponse = {
          id: user.id,
          name: user.name,
          role: user.role,
          status: user.status, // Assuming status field exists in the User model
          accessToken: token,
          refreshToken: refreshToken,
        };
  
        // Send success response
        res.status(200).json(successResponse);
      } else {
        // Return incorrect password response
        const incorrectPasswordResponse = {
          errorCode: ERROR_CODES.INCORRECT_PASSWORD,
          message: ERROR_MESSAGES.INCORRECT_PASSWORD,
        };
        return res.status(401).json(incorrectPasswordResponse);
      }
    } catch (error) {
      // Handle unexpected errors, log them, and return 500 response
      logger.error('Error during login:', error);
      return res.status(500).json({
        errorCode: ERROR_CODES.UNEXPECTED_ERROR,
        message: ERROR_MESSAGES.UNEXPECTED_ERROR,
      });
    }
  };
  
  
  // GENERATE ACCESSTOKEN
  function generateAccessToken(id, name, password) {
    return jwt.sign(
      { id: id, name: name, password: password },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "600h",
      }
    );
  }
  
  // GENERATE REFERSHTOKEN
  function generateRefreshToken(id, name, password) {
    return jwt.sign(
      { id: id, name: name, password: password },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
  }

  // Export the function for use in other modules

module.exports = {
    createUser,
    login,

  };