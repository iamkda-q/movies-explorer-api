const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validationModelLink = {
  validator(v) {
    return validator.isURL(v);
  },
  message: 'Your link is invalid link!',
};

const validationLink = (v, helpers) => {
  if (validator.isURL(v)) {
    return v;
  }
  return helpers.message('Your link is invalid link!');
};

const validationModelEmail = {
  validator(v) {
    return validator.isEmail(v);
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
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
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
      image: Joi.string().required().custom(validationLink),
      trailerLink: Joi.string().required().custom(validationLink),
      thumbnail: Joi.string().required().custom(validationLink),
      movieId: Joi.number().required().integer(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  })
);

const vaildateId = () => (
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().hex().length(24),
    }),
  })
);

module.exports = {
  validationModelEmail,
  validationModelLink,
  vaildateUserInfo,
  vaildateMovie,
  vaildateId,
  vaildateSignUp,
  vaildateSignIn,
};
