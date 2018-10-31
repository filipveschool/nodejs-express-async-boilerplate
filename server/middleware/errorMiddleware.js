//
// Error handling
// -----------------------------------------------------------------------------

const {
  APIError,
  InternalServerError,
  Unauthorized,
} = require('rest-api-errors');
const { STATUS_CODES } = require('http');
const winston = require('winston');

module.exports = (err, req, res, next) => {
  const error = err instanceof APIError ? err : new InternalServerError();

  if (process.env.NODE_ENV !== 'production') {
    winston.log('error', '-----> Unknown server error...');

    winston.log('error', err);
  }

  res.status(error.status || 500).json({
    code: error.code || 500,
    message: error.message || STATUS_CODES[error.status],
  });
};
