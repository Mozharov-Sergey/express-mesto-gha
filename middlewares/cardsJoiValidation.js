const { celebrate, Joi } = require('celebrate');

const urlRegexp = /https?:\/\/w*\.?[1-9a-z-._~:/?#[\]@!$&'()*+,;=]{1,}#?/i;

const createCardJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlRegexp),
    })
    .unknown(true),
});

const likeCardJoiValidation = () => celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().length(24),
    })
    .unknown(true),
});

const deleteCardJoiValidation = () => celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().length(24),
    })
    .unknown(true),
});

module.exports = { createCardJoiValidation, likeCardJoiValidation, deleteCardJoiValidation };