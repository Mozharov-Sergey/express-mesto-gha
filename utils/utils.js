
const NotFoundError = require('../errors/NotFoundError');

module.exports.return404 = (req, res, next) => {
  next(new NotFoundError('Странрица не найдена'));
};
