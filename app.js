const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();
const users = require('./routes/users');
const cards = require('./routes/cards');
const { return404 } = require('./utils/utils');
const { HTTP_ERROR_500 } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const { createUserJoiValidation, signInJoiValidation } = require('./middlewares/usersJoiValidation');
const auth = require('./middlewares/auth');

async function connectToDb() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {});
  } catch (e) {
    console.log(e);
  }
}

const app = express();
connectToDb();
app.use(express.json());
app.post('/signin', signInJoiValidation(), login);
app.post('/signup', createUserJoiValidation(), createUser);
app.use('/cards', cards);
app.use('/users', users);
app.use('*', auth, return404);
app.use(errors());
app.use((err, req, res, next) => {
  try {
    if (err.statusCode) {
      return res.status(err.statusCode).send({ message: err.message });
    }
    return res.status(HTTP_ERROR_500).send('Ошибка на сервере');
  } catch (error) {
    res.status(HTTP_ERROR_500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
