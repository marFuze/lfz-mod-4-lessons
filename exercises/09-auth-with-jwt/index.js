const express = require('express');
const jwt = require('jwt-simple');
const ApiError = require('./lib/api_error');
const auth = require('./middleware/auth');
const db = require('./db');
const defaultErrorHandler = require('./middleware/default_error_handler');
const hash = require('./lib/hash');
const { jwtSecret } = require('./config/jwt');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());

app.post('/api/sign-up', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) throw new ApiError(422, 'Missing user\'s name');
    if (!email) throw new ApiError(422, 'Missing user\'s email');
    if (!password) throw new ApiError(422, 'Missing user\'s password');

    const passHash = await hash.generate(password);

    let insertId = null;

    try {
      const { rows: [ newUser ] } = await db.query(`
        INSERT INTO "users"
        ("name", "email", "password")
        VALUES ($1, $2, $3)
        returning "userId"`,
        [name, email, passHash]
      );

      insertId = newUser.userId;
    } catch(error) {
      if (error.code === '23505') {
        throw new ApiError(422, 'Email already in use');
      }
      throw new ApiError(500, 'Error saving user');
    }

    // Create an object with 2 properties save it into a const named "tokenData"
    // - "userId" | set to insertId
    // - "ts" | set to the current Unix timestamp 
    const tokenData = {
      userId: insertId,
      ts: Date.now()
    }

    

    // Use jwt to encode the tokenData object
    // Save the token into a const named "token"
    

    // Send the token to the client
    
  } catch(error) {
    next(error);
  }
});

app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errorMessage = 'Invalid email/password combination';

    if (!email) throw new ApiError(422, 'Missing user\'s email');
    if (!password) throw new ApiError(422, 'Missing user\'s password');

    const { rows: [user = null] } = await db.query(`
      SELECT "userId", "password" FROM "users"
      WHERE "email" = $1`,
      [email]
    );

    if (!user) {
      throw new ApiError(401, errorMessage);
    }

    const passMatch = await hash.compare(password, user.password);

    if (!passMatch) {
      throw new ApiError(401, errorMessage);
    }

    // Create an object with 2 properties save it into a const named "tokenData"
    // - "userId" | set to user.userId
    // - "ts" | set to the current Unix timestamp 
    

    // Use jwt to encode the tokenData object
    // Save the token into a const named "token"
    

    // Send the token to the client
    
  } catch (error) {
    next(error);
  }
});

// Add the "auth" middleware to this endpoint
app.get('/api/products', async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Not Authorized');
    }

    const { rows: products = [] } = await db.query('SELECT * FROM "products"');

    res.send(products);
  } catch (error) {
    next(error);
  }
});

app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log('Server listening @ localhost:' + PORT);
});
