const express = require("express");

//доволяє нам прокладати маршрути
const router = express.Router();
const { check, validationResult } = require("express-validator");

// користувачі будуть створюватись на екземпларі(схемі)
let User = require("../schemas/newUser");

//дозволяє хешіровати паролі
let bcryptjs = require("bcryptjs");

//сервіс компанії Automattic, що дозволяє інтернет-користувачам зберігати свій аватар на спеціальному сервері.
// Користувач реєструється на центральному сервері і зберігає там свій аватар і адресу електронної пошти.
//Коли він залишає коментар на сайті або блозі, що підтримує Gravatar, і вказує свою адресу електронної пошти,
//на стороні сайту обчислюється MD5-хеш від поштової адреси і відправляється на сервер Gravatar, у відповідь повертається аватар користувача
const gravatar = require("gravatar");

//Як правило, використовується для передачі даних для аутентифікації в клієнт-серверних додатках.
//Токени створюються сервером, підписуються секретним ключем і передаються клієнтам, який у подальшому використовує данний токен для підтвердження своєї особистості
const jwt = require("jsonwebtoken");

const config = require("config");

const auth = require("../authentication/auth");

router.get("/get_by_email/:user_email", async (req, res) => {
  try {
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    //отримуємо параметри з нашого запроса через строку
    let userEmail = req.params.user_email;

    //шукає в БД по емейлу
    let user = await User.findOne({
      email: userEmail,
    }).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

router.get("/user_by_id/:user_id", async (req, res) => {
  try {
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    //отримуємо параметри з нашого запроса через строку
    let userId = req.params.user_id;

    let user = await User.findById(userId).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    //шукає по id .selecet('-password) - щоб не вводити пароль знову
    let user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});
//get метод, який дозволяє нам отримати всіх користувачів
router.get("/users", async (req, res) => {
  try {
    let users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
});
//можливості пакета express-validator check() провірка при відправці данних
router.post(
  "/register",
  [
    check("name", "name is empty").not().isEmpty(),
    check("lastName", "lastName is empty").not().isEmpty(),
    check("userName", "userName is empty").not().isEmpty(),
    check("email", "E-mail is empty").isEmail(),
    check(
      "password",
      "The password must be between 6 and 12 characters long"
    ).isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res) => {
    try {
      let { name, lastName, userName, email, password } = req.body;

      //Провірка на наявного користувача по email
      let inaccessibleUser = await User.findOne({
        email,
      }).select("-password");

      //Провірка на наявного користувача по lastName
      let inaccessibleUserName = await User.findOne({
        userName,
      }).select("-password");

      //Відловка помилки
      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      //якщо наявний користувач
      if (inaccessibleUser)
        return res.status(401).send("User has already been created");

      if (inaccessibleUserName === userName)
        return res.send("this user name is already in use");

      //прикріплення до кожного користувача можливість додавання аватару
      let avatar = gravatar.url(email, {
        r: "pg",
        d: "mm",
        s: "200",
      });
      //Створюємо екземпляр нового користувача
      let newUser = new User({
        name,
        lastName,
        userName,
        email,
        password,
        avatar,
      });

      const salt = await bcryptjs.genSalt(10);
      //Коли користувач намагається залогізуватися, введений ним пароль проходить через хеш-функцію
      //і порівнюється з хешем, захищений у базі даних. Якщо він хеші відповідає, користувач отримує доступ до захищеного продукту.
      let hashPassword = await bcryptjs.hash(password, salt);

      newUser.password = hashPassword;

      //очікує заповнення всієї інформаціїї і зберігає нового користувача
      await newUser.save();

      let payload = {
        user: {
          id: newUser.id,
        },
      };
      //створення токенів преобразує обєкт користувача в
      //{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZjZmM4MDFlNTI1N2QzY2MwNjZmYjk2In0sImlhdCI6MTYwNzQ1MjY3MywiZXhwIjoxNjA3NDU1NjczfQ.Flb8Oz6LEwdJm87C6LFyhIpP4rSVddQGNn-kGCbp7vA" }
      //можно провірити на - https://jwt.io/
      jwt.sign(
        payload,
        config.get("jsonwebtoken"),
        {
          expiresIn: 3000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

//створення роута для login перевірка на - наявні email password в БД
router.post(
  "/login",
  [
    check("email", 'E-mail is empty or type "...@gmail.com"').isEmail(),
    check(
      "password",
      "The password must be between 6 and 12 characters long"
    ).isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res) => {
    try {
      let { email, password } = req.body;

      //Провірка на наявного користувача по email findOne шукає в БД схожий емейл
      let user = await User.findOne({
        email,
      });

      //Відловка помилки
      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      //якщо не наявний користувач, значить його не було створено повертає true or false
      if (!user) return res.status(404).send("Sorry user not found");

      //зрівнюємо паролі, які приходять з req.body, з паролем БД
      let checkedPassword = await bcryptjs.compare(password, user.password);

      //Якщо зверху false - викидає помилку(паролі не співпадають)
      if (!checkedPassword)
        return res.status(401).send("Password do not match");

      let payload = {
        user: {
          id: user.id,
        },
      };

      //створення токенів преобразує обєкт користувача в
      //{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZjZmM4MDFlNTI1N2QzY2MwNjZmYjk2In0sImlhdCI6MTYwNzQ1MjY3MywiZXhwIjoxNjA3NDU1NjczfQ.Flb8Oz6LEwdJm87C6LFyhIpP4rSVddQGNn-kGCbp7vA" }
      //можно провірити на - https://jwt.io/
      jwt.sign(
        payload,
        config.get("jsonwebtoken"),
        {
          expiresIn: 3000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error.");
    }
  }
);

router.put(
  "/search_by_userName",
  [check("userFromSearch", "Input is a empty").not().isEmpty()],
  async (req, res) => {
    try {
      let { userFromSearch } = req.body;

      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      let users = await User.find().select("-password");

      let findUser = users.filter(
        (user) =>
          user.userName.toString().toLowerCase().split(" ").join("") ===
          userFromSearch.toLowerCase().split(" ").join("")
      );

      res.json(findUser);
    } catch (err) {
      if (err) {
        console.error(err.message);

        return res.status(500).send("Server error");
      }
    }
  }
);

router.put(
  "/change_user_data/:user_data",
  auth,
  [check("changeData", "Input is empty").not().isEmpty()],
  async (req, res) => {
    try {
      //входящі дані в подальшому буде прикріплений інпут
      const { changeData } = req.body;

      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      //пошук по ID
      let user = await User.findById(req.user.id).select("-password");

      if (!user) return res.status(404).json("User is not found");

      //userDataToChange = name, lastname,userName
      let userDataToChange = req.params.user_data.toString();
      //якщо ввели те саме значення
      if (user[userDataToChange] === changeData.toString())
        return res
          .status(401)
          .json("The given name is already in the database");

      user[userDataToChange] = changeData.toString();

      await user.save();

      res.json("Data is changed");
    } catch (err) {
      console.error(err);

      return res.status(500).json("Server error");
    }
  }
);

//зміна пароля
router.put(
  "/check_actual_password",
  auth,
  [
    check(
      "passwordToCheck",
      "Password has to be 6 letter and below 12"
    ).isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res) => {
    try {
      const { passwordToCheck } = req.body;

      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      let user = await User.findById(req.user.id);
      //перевірка пароля
      let passwordMatch = await bcryptjs.compare(
        passwordToCheck,
        user.password
      );
      // //якщо пароль не ідентичний
      // if (!passwordMatch) return res.status(401).json('Password do not match');

      res.json("passwords match");
    } catch (err) {
      console.error(err);

      return res.status(500).json("Server error");
    }
  }
);

router.put(
  "/change_password",
  auth,
  [
    check(
      "newPassword",
      "New password must be between 6 and 12 characters long"
    ).isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req, res) => {
    try {
      const { newPassword } = req.body;

      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      let user = await User.findById(req.user.id);

      const salt = await bcryptjs.genSalt(10);

      const hashPassword = await bcryptjs.hash(newPassword, salt);

      // if (hashPassword == user.password) return res.status(404).json('old and new passwords must not match');

      user.password = hashPassword;

      await user.save();

      res.send(hashPassword);
    } catch (err) {
      console.error(err);

      return res.status(500).json("Server error");
    }
  }
);
// router.post('/login', async(req,res)=>{})
module.exports = router;
