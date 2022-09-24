const Movie = require('../models/movie');
const NotFound = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

// Получение всех карточек
const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// Создание новой карточки
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send({
      _id: movie._id,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Удаление карточки
const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .orFail(() => {
      throw new NotFound('Фильм с указанным id не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужой фильм!');
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
