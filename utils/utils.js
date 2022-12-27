const NotFoundError = require('../errors/NotFoundError');

module.exports.urlRegexp = /https?:\/\/w*\.?[1-9a-z-\._~:/?#\[\]@!$&'()*+,;=]{1,}#?/i;
module.exports.emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports.return404 = (req, res, next) => {
  next(new NotFoundError('Странрица не найдена'));
};
