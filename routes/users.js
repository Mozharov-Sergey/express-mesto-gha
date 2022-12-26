const express = require('express');
const auth = require('../middlewares/auth');
const {
  getUserJoiValidation,
  updateUserJoiValidation,
  updateAvatarJoiValidation,
} = require('../middlewares/usersJoiValidation');

const {
  getUser, getUsers, updateUser, updateAvatar, getMe,
} = require('../controllers/users');

const users = express.Router();

users.use(auth);
users.get('/', getUsers);
users.get('/me', getMe);
users.patch('/me', updateUserJoiValidation(), updateUser);
users.get('/:userId', getUserJoiValidation(), getUser);
users.patch('/me/avatar', updateAvatarJoiValidation(), updateAvatar);

module.exports = users;
