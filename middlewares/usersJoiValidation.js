const { celebrate, Joi } = require('celebrate');

const urlRegexp = /https?:\/\/w*\.?[1-9a-z-._~:/?#[\]@!$&'()*+,;=]{1,}#?/i;

const getUserJoiValidation = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(true).length(24),
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
    avatar: Joi.string().pattern(urlRegexp),
  }),
});

const createUserJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegexp),
      email: Joi.string().required(true).email(),
      password: Joi.string().required().min(8),
    })
    .unknown(true),
});

const signInJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required(true).email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports = {
  getUserJoiValidation,
  updateUserJoiValidation,
  updateAvatarJoiValidation,
  createUserJoiValidation,
  signInJoiValidation,
};
