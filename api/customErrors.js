const httpStatus = require('http-status');

class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // this is required since bluebird 4 doesnt append it anymore
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class NotFoundError extends ExtendableError {
  constructor(message) {
    super(message, httpStatus.NOT_FOUND, true);
  }
}

module.exports = {
  NotFoundError,
};
