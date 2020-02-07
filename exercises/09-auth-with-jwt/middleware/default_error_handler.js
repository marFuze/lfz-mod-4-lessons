const ApiError = require('../lib/api_error');

module.exports = (error, req, res, next) => {
  let message = 'Internal server error';
  let status = 500;

  if (error instanceof ApiError) {
    message = error.message;
    status = error.status;
  }

  console.error(error);
  
  res.status(status).send({ status, message });
};
