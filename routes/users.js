const express = require('express');
const users = express.Router();

const User = require('../models/user');

const ERROR_CODE_404 = 404;
const ERROR_CODE_400 = 400;
const ERROR_CODE_500 = 500;

users.use(express.json());

users.get('/', (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' }));
});

users.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      }
    });
});

users.get('/:userId', (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      }
    });
});

users.patch('/me', (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name: name,
    about: about,
  })
    .then((user) => {
      res.send(user); // Возвращается информация о пользователе с опазданием на один шаг.
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      }
    });
});

users.patch('/me/avatar', (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar: avatar,
  })
    .then((user) => {
      res.send(user); // Возвращается информация о пользователе с опазданием на один шаг.
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_404).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
      }
    });
});

module.exports = users;
