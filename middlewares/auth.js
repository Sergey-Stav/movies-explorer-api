const { getPayload } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorizedError');
const { AUTHORIZATION_REQUIRED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTHORIZATION_REQUIRED);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = getPayload(token);
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
    return;
  }

  req.user = payload;

  next();
};
