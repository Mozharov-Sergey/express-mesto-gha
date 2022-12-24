const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const auth = require('../middlewares/auth');

const cards = express.Router();
const {
  getCards, createCard, deleteCard, cardLike, cardDislike,
} = require('../controllers/cards');

const urlRegexp = /https?:\/\/w*\.?[1-9a-z-._~:/?#[\]@!$&'()*+,;=]{1,}#?/i;

const createCardJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlRegexp),

    })
    .unknown(true),
});

cards.use(auth);
cards.use(errors());
cards.get('/', getCards);
cards.post('/', createCardJoiValidation(), createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', cardLike);
cards.delete('/:cardId/likes', cardDislike);

module.exports = cards;
