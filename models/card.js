const mongoose = require('mongoose');
const { urlRegexp } = require('../utils/utils');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegexp.test(v);
      },
      message: 'Не корректный URL карточки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [
    {
      default: [],
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
