const { celebrate, Joi } = require('celebrate');
const { linkRegExp, emailRegExp } = require('./constants');

const validationModelLink = {
  validator(v) {
    return linkRegExp.test(v);
  },
  message: 'Your link is invalid link!',
};

const validationModelEmail = {
  validator(v) {
    return emailRegExp.test(v);
  },
  message: 'The email address is invalid!',
};

const vaildateSignUp = () => (
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  })
);

const vaildateSignIn = () => (
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  })
);

const vaildateUserInfo = () => (
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  })
);

const vaildateMovie = () => (
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(linkRegExp),
      trailerLink: Joi.string().required().regex(linkRegExp),
      thumbnail: Joi.string().required().regex(linkRegExp),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  })
);

const vaildateMovieId = () => (
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().alphanum().hex().length(24),
    }),
  })
);

module.exports = {
  validationModelEmail,
  validationModelLink,
  vaildateUserInfo,
  vaildateMovie,
  vaildateMovieId,
  vaildateSignUp,
  vaildateSignIn,
};
