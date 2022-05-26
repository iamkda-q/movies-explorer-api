const badPathHandler = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

badPathHandler.use('/', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = badPathHandler;
