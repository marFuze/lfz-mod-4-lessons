const jwt = require('jwt-simple');
const {
  jwtSecret
} = require('../config/jwt');
const ApiError = require('../lib/api_error');
const db = require('../db');

module.exports = async (req, res, next) => {

  try {
    // Get token from request headers, header name should be "access-token"
    const accessToken = req.headers['access-token'];

    // Throw error if no access-token
    if (!accessToken) throw Error('no token found');

    // Use jwt to decode the token
    const decodedToken = jwt.decode(accessToken, jwtSecret, 'HS512');

    const {
      userId
    } = decodedToken

    // Query the DB to get the users name and email, and to ensure the userId is valid

    const {
      rows: userData = []
    } = await db.query(`
    SELECT "name", "email" FROM "users"
    WHERE "userId" = $1`,
      [userId]);

    const [{
      name,
      email
    }] = userData

    // Throw error if no user
    if (!name) throw new ApiError(422, 'Missing user\'s name');

    // Add the user to req.user

    req.user = name

    // Go to the next thing...
    next();
  } catch (error) {
    next(new ApiError(401, 'Not Authorized'));
  }
};
