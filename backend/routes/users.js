const express = require('express');

//доволяє нам прокладати маршрути
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

// користувачі будуть створюватись на екземпларі(схемі)
let User = require('../schemas/newUser');

//дозволяє хешіровати паролі
let bcryptjs = require('bcryptjs');

//сервіс компанії Automattic, що дозволяє інтернет-користувачам зберігати свій аватар на спеціальному сервері.
// Користувач реєструється на центральному сервері і зберігає там свій аватар і адресу електронної пошти. 
//Коли він залишає коментар на сайті або блозі, що підтримує Gravatar, і вказує свою адресу електронної пошти, 
//на стороні сайту обчислюється MD5-хеш від поштової адреси і відправляється на сервер Gravatar, у відповідь повертається аватар користувача
const gravatar = require('gravatar');

//Як правило, використовується для передачі даних для аутентифікації в клієнт-серверних додатках. 
//Токени створюються сервером, підписуються секретним ключем і передаються клієнтам, який у подальшому використовує данний токен для підтвердження своєї особистості
const jwt = require('jsonwebtoken');

const config = require('config');

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

        //Провірка на наявного користувача по email
        let inaccessibleUser = await User.findOne({
            email
        }).select('-password');

        //Провірка на наявного користувача по lastName
        let inaccessibleUserName = await User.findOne({
            userName
        }).select('-password');

        //Відловка помилки
        let err = validationResult(req);

        if (!err.isEmpty()) return res.status(400).json({
            err: err.array()
        });

        //якщо наявний користувач
        if (inaccessibleUser) return res.status(401).send('User has already been created');

        if (inaccessibleUserName === userName) return res.send('this user name is already in use');

        //прикріплення до кожного користувача можливість додавання аватару
        let avatar = gravatar.url(email, {
            r: 'pg',
            d: 'mm',
            s: '200'
        });
        //Створюємо екземпляр нового користувача
        let newUser = new User({
            name,
            lastName,
            userName,
            email,
            password,
            avatar
        })

        const salt = await bcryptjs.genSalt(10);
        //Коли користувач намагається залогізуватися, введений ним пароль проходить через хеш-функцію
        //і порівнюється з хешем, захищений у базі даних. Якщо він хеші відповідає, користувач отримує доступ до захищеного продукту.
        let hashPassword = await bcryptjs.hash(password, salt);

        newUser.password = hashPassword;

        //очікує заповнення всієї інформаціїї і зберігає нового користувача
        await newUser.save();

        let payload = {
            user: {
                id: newUser.id
            }
        };
        //створення токенів преобразує обєкт користувача в 
        //{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZjZmM4MDFlNTI1N2QzY2MwNjZmYjk2In0sImlhdCI6MTYwNzQ1MjY3MywiZXhwIjoxNjA3NDU1NjczfQ.Flb8Oz6LEwdJm87C6LFyhIpP4rSVddQGNn-kGCbp7vA" }
        //можно провірити на - https://jwt.io/
        jwt.sign(
            payload,
            config.get("jsonwebtoken"), {
                expiresIn: 3000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                })
            }
        );
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server error.')
    }
})

//створення роута для login перевірка на - наявні email password в БД
router.post('/login', [
    check('email', 'E-mail is empty').isEmail(),
    check('password', 'The password must be between 6 and 12 characters long').isLength({
        min: 6,
        max: 12
    })
], async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body;

        //Провірка на наявного користувача по email findOne шукає в БД схожий емейл
        let user = await User.findOne({
            email
        });

        //Відловка помилки
        let err = validationResult(req);

        if (!err.isEmpty()) return res.status(400).json({
            err: err.array()
        });

        //якщо не наявний користувач, значить його не було створено повертає true or false
        if (!user) return res.status(404).send('Sorry user not found');

        //зрівнюємо паролі, які приходять з req.body, з паролем з БД
        let checkedPassword = await bcryptjs.compare(password, user.password);

        //Якщо зверху false - викидаэ помилку(паролі не співпадають)
        if (!checkedPassword) return res.status(401).send('Password do not match');

        let payload = {
            user: {
                id: user.id
            }
        };

        //створення токенів преобразує обєкт користувача в 
        //{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZjZmM4MDFlNTI1N2QzY2MwNjZmYjk2In0sImlhdCI6MTYwNzQ1MjY3MywiZXhwIjoxNjA3NDU1NjczfQ.Flb8Oz6LEwdJm87C6LFyhIpP4rSVddQGNn-kGCbp7vA" }
        //можно провірити на - https://jwt.io/
        jwt.sign(
            payload,
            config.get("jsonwebtoken"), {
                expiresIn: 3000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                })
            }
        );
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server error.')
    }
})

// router.post('/login', async(req,res)=>{})
module.exports = router;