const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const auth = require('../middlewares/auth');

const createUserJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
      email: Joi.string().required(true),
      password: Joi.string().min(8),
    })
    .unknown(true),
});

const {
  getUser, createUser, getUsers, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

const users = express.Router();

users.use(express.json());

users.use(auth);
users.use(errors());
users.get('/', getUsers);
users.post('/', createUserJoiValidation(), createUser);
users.get('/me', getMe);
users.patch('/me', updateUser);
users.get('/:userId', getUser);
users.patch('/me/avatar', updateAvatar);

module.exports = users;
