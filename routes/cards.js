const express = require('express');
const auth = require('../middlewares/auth');
const {
  createCardJoiValidation,
  likeCardJoiValidation,
  deleteCardJoiValidation,
} = require('../middlewares/cardsJoiValidation');

const {
  getCards, createCard, deleteCard, cardLike, cardDislike,
} = require('../controllers/cards');

const cards = express.Router();

cards.use(auth);
cards.get('/', getCards);
cards.post('/', createCardJoiValidation(), createCard);
cards.delete('/:cardId', deleteCardJoiValidation(), deleteCard);
cards.put('/:cardId/likes', likeCardJoiValidation(), cardLike);
cards.delete('/:cardId/likes', likeCardJoiValidation(), cardDislike);

module.exports = cards;
