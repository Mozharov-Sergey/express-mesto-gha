const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { urlRegexp } = require('../utils/utils');

const customIsUrl = (value) => {
  const isUrl = validator.isURL(value);
  if (!isUrl) {
    throw new Error('не корректный URL');
  }
  return value;
};

const getUserJoiValidation = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(true).hex().length(24),
  }),
});

const updateUserJoiValidation = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarJoiValidation = () => celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(customIsUrl),
  }),
});

const createUserJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(customIsUrl),
      email: Joi.string().required(true).email(),
      password: Joi.string().required(true),
    })
    .unknown(true),
});

const signInJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required(true).email(),
      password: Joi.string().required(true),
    }),
});

module.exports = {
  getUserJoiValidation,
  updateUserJoiValidation,
  updateAvatarJoiValidation,
  createUserJoiValidation,
  signInJoiValidation,
};
