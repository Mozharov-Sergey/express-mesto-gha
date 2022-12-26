/* eslint-disable consistent-return */
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send({ message: cards });
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({ name, link, owner: req.user._id });
    res.send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    }
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    const userId = req.user._id;

    if (!card) {
      throw new NotFoundError('Карточки с таким Id несуществует');
    }
    const cardOwner = card.owner.valueOf();

    const match = userId === cardOwner;

    if (!match) {
      throw new UnauthorizedError('У вас нет прав на удаление карточке другого пользователя');
    }

    if (match) {
      await Card.findByIdAndRemove(cardId); // Или все таки Delete?
      return res.send({ deleted: card });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.cardLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).orFail(() => new NotFoundError('Такой карточки не существует'));

    if (card) {
      return res.send({ data: card });
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError(err.message));
    }
    next(err);
  }
};

module.exports.cardDislike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).orFail(() => new NotFoundError('Такой карточки не существует'));
    if (card) {
      res.send({ data: card });
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};
