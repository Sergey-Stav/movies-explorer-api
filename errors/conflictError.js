const { ApplicationError } = require('./errors');
const { ErrorConflict } = require('../utils/constants');

class ConflictError extends ApplicationError {
  constructor(message) {
    super(ErrorConflict, message);
  }
}

module.exports = ConflictError;
