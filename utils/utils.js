const NotFoundError = require('../errors/NotFoundError');

module.exports.urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
module.exports.emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports.return404 = (req, res, next) => {
  next(new NotFoundError('Странрица не найдена'));
};
