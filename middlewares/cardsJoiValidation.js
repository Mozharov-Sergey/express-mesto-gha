const { celebrate, Joi } = require('celebrate');

const createCardJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    })
    .unknown(true),
});

const likeCardJoiValidation = () => celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().hex().length(24),
    })
    .unknown(true),
});

const deleteCardJoiValidation = () => celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().hex().length(24),
    })
    .unknown(true),
});

module.exports = { createCardJoiValidation, likeCardJoiValidation, deleteCardJoiValidation };
