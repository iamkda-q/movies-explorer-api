const movieRouter = require('express').Router();
const { vaildateMovie, vaildateMovieId } = require('../utils/validation');
const { getMovies, postMovie, removeMovie } = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', vaildateMovie(), postMovie);
movieRouter.delete('/movies/:movieId', vaildateMovieId(), removeMovie);

module.exports = movieRouter;
