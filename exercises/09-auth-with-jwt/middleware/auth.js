const jwt = require('jwt-simple');
const { jwtSecret } = require('../config/jwt');
const ApiError = require('../lib/api_error');
const db = require('../db');

module.exports = async (req, res, next) => {
  try {
    // Get token from request headers, header name should be "access-token"
    

    // Throw error if no access-token
    

    // Use jwt to decode the token
    

    // Query the DB to get the users name and email, and to ensure the userId is valid
    

    // Throw error if no user
    

    // Add the user to req.user
    

    // Go to the next thing...
    next();
  } catch(error) {
    next(new ApiError(401, 'Not Authorized'));
  }
};
