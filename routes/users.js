const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const auth = require('../middlewares/auth');



const {
  getUser, createUser, getUsers, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

const users = express.Router();

users.use(express.json());

users.use(auth);
users.use(errors());
users.get('/', getUsers);
// users.post('/', createUserJoiValidation(), createUser);
users.get('/me', getMe);
users.patch('/me', updateUser);
users.get('/:userId', getUser);
users.patch('/me/avatar', updateAvatar);

module.exports = users;
