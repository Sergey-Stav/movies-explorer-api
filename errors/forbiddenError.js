const { ApplicationError } = require('./errors');
const { ErrorForbidden } = require('../utils/constants');

class ForbiddenError extends ApplicationError {
  constructor(message) {
    super(ErrorForbidden, message);
  }
}

module.exports = ForbiddenError;
