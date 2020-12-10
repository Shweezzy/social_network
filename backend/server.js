const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToMongo');
const cors = require('cors');

//підключаємось до ДБ
connectToDatabase();

//уникаємо помилки CORS при запросах
app.use(cors());

//дозволяє відправляти запроси в форматі json
app.use(express.json({
    extended: false
}));

//кожен роут(запрос) повинен бути на різних URL
app.use('/api/posts', require('./routes/posts.js'))
app.use('/api/users', require('./routes/users.js'))

//Коли ми розмістимо на heroku, то він нам видасть автоматичний порт,
//якщо його не надасть - 0000
let PORT = process.env.PORT || 1000;

//метод, який приймає наш порт, а другим аргументом - функцію, яка сповіщає ПОРТ і старт
app.listen(PORT, () => {
    console.log(`Server is on: ${PORT}`)
})