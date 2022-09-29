const { ApplicationError } = require('./errors');
const { ErrorUnauthorized } = require('../utils/constants');

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(ErrorUnauthorized, message);
  }
}

module.exports = UnauthorizedError;
