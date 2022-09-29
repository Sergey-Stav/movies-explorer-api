const Movie = require('../models/movie');
const NotFound = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const {
  WRONG_DATA_MOVIE,
  MOVIE_NOT_FOUND,
  ACCESS_ERROR,
} = require('../utils/constants');

// Получение всех карточек
const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// Создание новой фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_DATA_MOVIE));
      } else {
        next(err);
      }
    });
};

// Удаление фильма
const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .orFail(() => {
      throw new NotFound(MOVIE_NOT_FOUND);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(ACCESS_ERROR);
      }
      Movie.findByIdAndRemove(req.params.movieId).select('-owner')
        .then((deletedMovie) => res.status(200).send(deletedMovie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovieById,
};
