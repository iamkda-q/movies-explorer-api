const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { localKey } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : localKey);
  } catch (err) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }

  req.user = payload;

  next();
};
