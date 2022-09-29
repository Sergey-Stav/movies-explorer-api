const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFound = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const { getJwtToken } = require('../utils/jwt');
const {
  USER_NOT_FOUND,
  WRONG_DATA_USER,
  EMAIL_ALREADY_EXISTS,
} = require('../utils/constants');

// получение информации о текущем пользователе
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => next(new NotFound(USER_NOT_FOUND)))
    .then((user) => res.send(user))
    .catch(next);
};

// обновление информации о пользователе
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => next(new NotFound(USER_NOT_FOUND)))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_DATA_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

// создание нового пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const newUser = { ...user.toJSON() };
      delete newUser.password;
      res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_DATA_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

// логин пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user.id);
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser, updateUser, getCurrentUser, login,
};
