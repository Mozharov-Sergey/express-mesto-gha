const { getUser, createUser, getUsers, updateUser, updateAvatar } = require('../controllers/users');
const express = require('express');
const users = express.Router();

users.use(express.json());

users.get('/', getUsers);
users.post('/', createUser);
users.get('/:userId', getUser);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateAvatar);

module.exports = users;
