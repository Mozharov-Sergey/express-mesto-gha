const express = require('express');
const { restart } = require('nodemon');
const cards = express.Router();

const Card = require('../models/card');

const ERROR_CODE_404 = 404;
const ERROR_CODE_400 = 400;
const ERROR_CODE_500 = 500;

cards.get('/', (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' }));
});
cards.post('/', (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      }
    });
});

cards.delete('/:cardId', (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        res.send({ message: 'Карточка удалена' });
      } else {
        res.status(ERROR_CODE_404).send({ message: 'card not found' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      }
    });
});

cards.put('/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      res.status(404).send({ message: 'Такой карточки не существует' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      }
    });
});

cards.delete('/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      }
      res.status(ERROR_CODE_404).send({ message: 'not found' });
    })

    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: err.message });
      }
    });
});

module.exports = cards;
