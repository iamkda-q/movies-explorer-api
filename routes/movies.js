const movieRouter = require('express').Router();
const { vaildateMovie, vaildateId } = require('../utils/validation');
const { getMovies, postMovie, removeMovie } = require('../controllers/movies');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', vaildateMovie(), postMovie);
movieRouter.delete('/movies/:id', vaildateId(), removeMovie);

module.exports = movieRouter;
