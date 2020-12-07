const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToMongo')
const cors = require('cors');

app.use(cors());
//дозволяє відправляти запроси в форматі json
app.use(express.json({
    extended: false
}));

//тестовий запрос
app.get('/', (req, res) => res.send('ITS WORKING'))
//Коли ми розмістимо на heroku, то він нам видасть автоматичний порт,
//якщо його не надасть - 5000
let PORT = process.env.PORT || 5000;
//слушатель, який приймає наш порт, а другим аргументом - функцію, яка сповіщає ПОРТ і старт
app.listen(PORT, () => {
    console.log(`Server is on: ${PORT}`)
})