const Movie = require('../models/movies');

const NotFoundError = require('../errors/NotFoundError');
const AuthorViolationError = require('../errors/AuthorViolationError');

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
      next(err);
    });
};

const removeMovie = (req, res, next) => {
  const currentUser = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с данным ID не обнаружен');
      }
      if (currentUser !== movie.owner.toString()) {
        throw new AuthorViolationError(
          'Вы не являетесь владельцем данного фильма',
        );
      }
    })
    .then(() => Movie.findByIdAndRemove(movieId))
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
