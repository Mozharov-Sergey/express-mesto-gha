const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const auth = require('../middlewares/auth');

const getUserJoiValidation = () => celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string().required(true).length(24),
    }),

});

const updateUserJoiValidation = () => celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),

});

const {
  getUser, getUsers, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

const users = express.Router();

users.use(express.json());

users.use(auth);
users.use(errors());
users.get('/', getUsers);
users.get('/me', getMe);
users.patch('/me', updateUserJoiValidation(), updateUser);
users.get('/:userId', getUserJoiValidation(), getUser);
users.patch('/me/avatar', updateAvatar);

module.exports = users;
