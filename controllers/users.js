const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { localKey } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не обнаружен');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Пользователя с данным ID не существует'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  User.findOne({ email })
    .then((user) => {
      if (user && user._id.toString() !== owner) {
        throw new ConflictError(
          'Пользователь с данным email уже зарегистрирован',
        );
      }
    })
    .then(() => User.findByIdAndUpdate(
      owner,
      { name, email },
      { new: true, runValidators: true },
    ))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : localKey, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUserInfo,
  updateUserInfo,
  login,
};
