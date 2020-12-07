const express = require('express');
//доволяє нам прокладати маршрути
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
// користувачі будуть створюватись на екземпларі(схемі)
let User = require('../schemas/newUser');
//дозволяэ хешіровати паролі
let bcryptjs = require('bcryptjs');

//можливості пакета express-validator check() провірка при відправці данних
router.post('/register', [
    check('name', 'name is empty').not().isEmpty(),
    check('lastName', 'lastName is empty').not().isEmpty(),
    check('userName', 'userName is empty').not().isEmpty(),
    check('email', 'E-mail is empty').isEmail(),
    check('password', 'The password must be between 6 and 12 characters long').isLength({
        min: 6,
        max: 12
    })
], async (req, res) => {
    try {
        let {
            name,
            lastName,
            userName,
            email,
            password
        } = req.body;
        //Відловка помилки
        let err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({
                err: err.array()
            })
        }
        //Створюємо екземпляр нового користувача
        let newUser = new User({
            name,
            lastName,
            userName,
            email,
            password
        })

        const salt = await bcryptjs.genSalt(10);
        //Коли користувач намагається залогізуватися, введений ним пароль проходить через хеш-функцію
        //і порівнюється з хешем, захищений у базі даних. Якщо він хеші відповідає, користувач отримує доступ до захищеного продукту.
        let hashPassword = await bcryptjs.hash(password, salt);

        newUser.password = hashPassword;

        //очікує заповнення всієї інформаціїї і зберігає нового користувача
        await newUser.save();

        res.send('New user is created')
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server error.')
    }
})

// router.post('/login', async(req,res)=>{})
module.exports = router;