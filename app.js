const PORT = process.env.PORT || 3000;

const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

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

app.use((req, res, next) => {
  req.user = {
    _id: '6395cc76450c81433112a513', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/cards', cards);
app.use('/users', users);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
