const { celebrate, Joi } = require('celebrate');

const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

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
      password: Joi.string().required(),
    })
    .unknown(true),
});

const signInJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required(true).email(),
      password: Joi.string().required(),
    }),
});

module.exports = {
  getUserJoiValidation,
  updateUserJoiValidation,
  updateAvatarJoiValidation,
  createUserJoiValidation,
  signInJoiValidation,
};
