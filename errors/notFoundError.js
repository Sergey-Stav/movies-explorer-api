const { ApplicationError } = require('./errors');
const { ErrorNotFound } = require('../utils/constants');

class NotFound extends ApplicationError {
  constructor(message) {
    super(ErrorNotFound, message);
  }
}

module.exports = NotFound;
