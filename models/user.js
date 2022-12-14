const mongoose = require('mongoose');
const validator = require('validator');
const { emailRegexp } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя должно состоять как минимум из двух символов'],
    maxlength: [30, 'Имя должно быть не длиннее 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Описание должно состоять как минимум из двух символов'],
    maxlength: [30, 'Описание должно быть не длиннее 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'Не корректный URL аватара',
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegexp, 'Не валидный Email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
