const mongoose = require('mongoose');

// так звані схеми, або модулі (шаблон) для БД
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
});

//кожен новий користувач буде зберігатись тут по СХЕМІ
module.exports = userSchema = mongoose.model('user', userSchema)