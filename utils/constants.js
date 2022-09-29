const REGULAR_URL = /^(https?:\/\/)(www\.)?[\w-]+(\.[a-z])+[\w~!@#$%&*()-+=:;\\'",.?/]+#?/i;

const USER_NOT_FOUND = 'Пользователь по указанному _id не найден';
const WRONG_DATA_USER = 'Переданы некорректные данные пользователя';
const EMAIL_ALREADY_EXISTS = 'Пользователь с таким email уже существует';
const WRONG_DATA_MOVIE = 'Переданы некорректные данные при создании фильма.';
const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';
const ACCESS_ERROR = 'Нельзя удалить чужой фильм!';
const URL_NOT_FOUND = 'Запрашиваемый ресурс не найден, проверьте адрес';
const AUTHORIZATION_REQUIRED = 'Требуется авторизация';
const WRONG_EMAIL = 'Некорректный формат электронной почты';
const WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';

const ErrorValidation = 400;
const ErrorUnauthorized = 401;
const ErrorForbidden = 403;
const ErrorNotFound = 404;
const ErrorConflict = 409;
const ErrorDefault = 500;

module.exports = {
  REGULAR_URL,
  USER_NOT_FOUND,
  WRONG_DATA_USER,
  EMAIL_ALREADY_EXISTS,
  WRONG_DATA_MOVIE,
  MOVIE_NOT_FOUND,
  ACCESS_ERROR,
  URL_NOT_FOUND,
  AUTHORIZATION_REQUIRED,
  WRONG_EMAIL,
  WRONG_EMAIL_OR_PASSWORD,
  ErrorValidation,
  ErrorUnauthorized,
  ErrorForbidden,
  ErrorNotFound,
  ErrorConflict,
  ErrorDefault,
};
