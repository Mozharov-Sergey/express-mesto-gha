const { ERROR_CODE_404 } = require('./constants');

module.exports.return404 = (req, res) => {
  res.status(ERROR_CODE_404).send({ message: 'Page not found' });
};
