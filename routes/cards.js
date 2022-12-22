const express = require('express');
const auth = require('../middlewares/auth');

const cards = express.Router();
const {
  getCards, createCard, deleteCard, cardLike, cardDislike,
} = require('../controllers/cards');

cards.use(auth);
cards.get('/', getCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', cardLike);
cards.delete('/:cardId/likes', cardDislike);

module.exports = cards;
