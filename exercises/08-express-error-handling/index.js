const express = require('express');
const ApiError = require('./api_error');
const PORT = process.env.PORT || 9000;

const app = express();


app.get('/api/auth-error', (req, res, next) => {
  try {
    throw new ApiError(401, 'Not authorized');
  } catch (error) {
    next(error);
  }
});

app.get('/api/bad-request', (req, res, next) => {
  try {
    throw new ApiError(400, 'Bad request');
  } catch (error) {
    next(error);
  }
});

app.get('/api/not-found', (req, res, next) => {
  try {
    throw new ApiError(404, 'Not found');
  } catch (error) {
    next(error);
  }
});

app.get('/api/server-error', (req, res, next) => {
  try {
    throw new ApiError(500, 'Internal server error');
  } catch (error) {
    next(error);
  }
});

app.get('/api/uncaught-error', (req, res, next) => {
  try {
    iDoNotExist;
  } catch (error) {
    next(error);
  }
});

app.get('/api/unprocessable-entity', (req, res, next) => {
  try {
    throw new ApiError(422, 'Unprocessable entity');
  } catch (error) {
    next(error);
  }
});

app.use(function (err, req, res, next) {

  if (err instanceof ApiError) {
    console.log("api error status:", err.status,err.message);
    res.send({
      "message": err.message,
      "status": err.status
    }
    )
  } else {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  }
});

app.listen(PORT, () => {
  console.log('Server listening on PORT:', PORT);
});
