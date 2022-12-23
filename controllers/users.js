/* eslint-disable consistent-return */
require('dotenv').config();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const opts = { runValidators: true };
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require('../errors/AuthorizationError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    if (!validator.isEmail(email) || !password) {
      throw new BadRequestError('Не введен email или password');
    }

    const userItem = await User.findOne({ email });
    if (userItem) {
      throw new ConflictError('Такой пользователь уже существует');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    });

    if (newUser) {
      return res.send({ data: newUser });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError('Не верный пользователь или пароль');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AuthorizationError('Не верный пользователь или пароль');
    }

    if (user && isPasswordCorrect) {
      const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Такого пользователя несуществует');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    opts,
  )
    .then(() => {
      res.send({ data: req.body });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  })
    .then(() => {
      res.send(req.body);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' && err.name === 'CastError') {
        return next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw NotFoundError('Такого пользователя несуществует'); // Врядли до этого дойдет когда-то. Мидлвер отсечет запрос на этапе проверки токена.
    }
    return res.send(user);
  } catch (err) {
    next(err);
  }
};
