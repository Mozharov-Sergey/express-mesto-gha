/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable   no-console */

const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const users = require('./routes/users');
const cards = require('./routes/cards');
const { return404 } = require('./utils/utils');
const { login, createUser } = require('./controllers/users');

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

app.use('/cards', cards);
app.use('/users', users);
app.post('/signin', login);
app.post('/signup', createUser);
app.use('*', return404);
app.use((err, req, res, next) => {
  try {
    if (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
