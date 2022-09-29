const { ApplicationError } = require('./errors');
const { ErrorValidation } = require('../utils/constants');

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(ErrorValidation, message);
  }
}

module.exports = BadRequestError;
