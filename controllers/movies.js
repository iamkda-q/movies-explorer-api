const Movie = require('../models/movies');

const NotFoundError = require('../errors/NotFoundError');
const AuthorViolationError = require('../errors/AuthorViolationError');
const BadRequestError = require('../errors/BadRequestError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

const postMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const removeMovie = (req, res, next) => {
  const currentUser = req.user._id;
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с данным ID не обнаружен');
      }
      if (currentUser !== movie.owner.toString()) {
        throw new AuthorViolationError(
          'Вы не являетесь владельцем данного фильма',
        );
      }
      return (movie);
    })
    .then((movie) => movie.remove())
    .then((movie) => {
      res.send({
        message: `Фильм "${movie.nameRU}" успешно удален`,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getMovies, postMovie, removeMovie };
