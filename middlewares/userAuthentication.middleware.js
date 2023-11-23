require("dotenv").config();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const errorCodes = require('../utils/errorcodes.utils')
const errorMessages = require('../utils/errormessages.utils')


// currentuser interceptor for  Admin

const currentUserAdmin = async (req, res, next) => {
    try {
      // Extract token from the Authorization header
      const token = req.headers['authorization'];
      if (!token) {
        // If token is missing, return unauthorized
        return res.status(401).json({
          errorCode: errorCodes.AUTH_HEADER_MISSING,
          message: errorMessages.AUTH_HEADER_MISSING,
        });
      }
  
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // Find the user in the database based on the decoded token
      const user = await User.findById(decoded.id);
  
      // If user not found, return unauthorized
      if (!user || user.status !== 1) {
        return res.status(401).json({
          errorCode: errorCodes.INVALID_TOKEN,
          message: errorMessages.INVALID_TOKEN,
        });
      }
  
      // Check if the user has the correct role
      if (user.role !== 0) {
        return res.status(401).json({
          errorCode: errorCodes.UNAUTHORIZED_ACCESS,
          message: errorMessages.UNAUTHORIZED_ACCESS,
        });
      }
  
      // Create an object containing relevant user information
      const currentAdminObj = {
        userID: user.id,
        name: user.name,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
  
      // Attach the currentUserObj to the request for future use
      req.currentAdminObj = currentAdminObj;
  
   // Compare the decoded password with the user's password
   const validPassword = await bcrypt.compare(decoded.password, user.password);

   // If passwords don't match, return unauthorized
   if (!validPassword) {
       return next(res.status(401).json({
           errorCode: errorCodes.INVALID_TOKEN,
           message: errorMessages.INVALID_TOKEN
       }));
   }

  
      // Proceed to the next middleware
      next();
    } catch (error) {
      // Handle token expiration or other errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          errorCode: errorCodes.TOKEN_EXPIRED,
          message: errorMessages.TOKEN_EXPIRED,
        });
      }
      return res.status(401).json({
        errorCode: errorCodes.UNAUTHORIZED_ACCESS,
        message: errorMessages.UNAUTHORIZED_ACCESS,
      });
    }
  }

// currentuser interceptor for  user
const currentUser  = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers['authorization'];
        if (!token) {
            // If token is missing, return unauthorized
            return next(res.status(401).json({
                errorCode: errorCodes.AUTH_HEADER_MISSING,
                message: errorMessages.AUTH_HEADER_MISSING
            }));
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user in the database based on the decoded token
  
      // Find the user in the database based on the decoded token
      const user = await User.findById(decoded.id);
  
        // If user not found, return unauthorized
        if (!user) {
            return next(res.status(401).json({
                errorCode: errorCodes.INVALID_TOKEN,
                message: errorMessages.INVALID_TOKEN
            }));
        }

        // Check if the user has the correct role
        if (user.role !== 1) {
            return next(res.status(401).json({
                errorCode: errorCodes.UNAUTHORIZED_ACCESS,
                message: errorMessages.UNAUTHORIZED_ACCESS
            }));
        }

        // Create an object containing relevant user information
        const currentUserObj = {
            userID: user.id,
            name: user.name,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        // Attach the currentUserObj to the request for future use
        req.currentUserObj = currentUserObj;

        // Compare the decoded password with the user's password
        const validPassword = await bcrypt.compare(decoded.password, user.password);

        // If passwords don't match, return unauthorized
        if (!validPassword) {
            return next(res.status(401).json({
                errorCode: errorCodes.INVALID_TOKEN,
                message: errorMessages.INVALID_TOKEN
            }));
        }

        // If all checks pass, proceed to the next middleware
        next();
    } catch (error) {
        console.log(error,"err");
        // Handle token expiration or other errors
        if (error.name === 'TokenExpiredError') {
            return next(res.status(401).json({
                errorCode: errorCodes.TOKEN_EXPIRED,
                message: errorMessages.TOKEN_EXPIRED
            }));
        }
        return next(res.status(401).json({
            errorCode: errorCodes.UNAUTHORIZED_ACCESS,
            message: errorMessages.UNAUTHORIZED_ACCESS
        }));
    }
};

// Export the middleware function
module.exports = {currentUserAdmin,currentUser} ;