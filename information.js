/*
Backend


express - пакет для відтворення запросів
express-validator - ми використовуємо експрес-валідатор, щоб перевірити, чи дані, які надсилаються, відповідають нашим стандартам, наприклад, ми можемо перевірити електронну пошту, якщо рядок порожній
jsonwebtoken - змога зробити кожного юзера унікальним за допомогою сокетів
bcryptjs - змога створювати хэш паролі
forever(nodemon) - дає можливість самостійно не перезавантажувати node index.js
mongoose - дає можливість конектитись до БД і т.д.

1. Створення локального сервера з портом server.js з підключеними CORS для запросів
2. Створення підключення до БД - асинхронна ф-я mongoose.connect
3. Створення роутів app.use('/api/us /post)
4. Створення шаблону(схеми) schemas/newUser.js для кожного користувача, який буде відсилатись до БД
5. Створення роута(users.js - router.post('/register') і форма його регістрації, використання можливостей express-validator,
    хеш-паролі(bcryptjs), новий користувач new User({name,laastName...})
6. Додавання можливостей gravatar кожному створеному користувачу
7. Використання jsonwebtoken для проходження аутентифыкації
8. Провірка наявний полів у БД inaccessibleUser inaccessibleUserName через метод findOne.
9. Створення роута(users.js - router.post('/login') перевірка наявного користувача в БД методом findOne
    перевірка пароля у разі знаходження користувача методом compare(зрівнює входящий пароль з паролем БД)
10. Створення аутентифікації за допомогою jwt
11. Створення пошуку користувачів userName(inputValue)
12. Додана можливість змінювати name, lastName, userName
13. Провірка пароля а також можливість його зміни
14. Додані методи пошуку(перевірки) по id and email
15. Створення нового шаблону(схеми) для постів(коменти(лайки)) з сортуванням
16. Створення нового роута posts.js - app.use('/api/posts', require('./routes/posts.js'))
    підключення директив
17. Створення запросів GET /posts, /the_most_recent, /the_most_commented, /single_post, /user_post/, /liked
    можливість додавати пост в БД POST /
18. Можливість коментів, лайків, лайки коментів, також можливість видалення комментів і лайків

Frontend


react-router-dom - React Router це стандартна бібліотека маршрутизації (routing) в React. Він зберігає інтерфейс програми синхронізованим з URL на браузері
redux - Це передбачуваний контейнер станів для JavaScript додатків
-Існує єдине джерело істини для всього вашого стану програми.
-Цей стан тільки для читання (read-only).
-Всі зміни в стан додатку вносяться за допомогою чистих функцій
redux-thunk -  За замовчуванням, екшени в Redux є синхронними, що, є проблемою для додатка, якому потрібно взаємодіяти з серверним API
middleware библиотеки для асинхронных экшенов в Redux, это — Redux Thunk и Redux Saga
react-moment - бібліотека для кращої взаємодії з датами,часом ...
moment
axios - це широко відома JavaScript-бібліотека. Вона являє собою HTTP-клієнт, заснований на Проміс і призначений для браузерів і для Node.js


//Метод composeWithDevTools це покращений метод compose, який автоматично додає devtools до всього, що ми передали йому всередину
import { composeWithDevTools } from "redux-devtools-extension";

//Mідлвар (middleware) - це пропонований спосіб розширення Redux за допомогою настроюваних функцій. 
//Mідлвар дозволяє вам обернути метод стору dispatch для користі і справи. Ключовою особливістю мідлвара є те, що вони компонуються. 
//Кілька мідлваров можна об'єднати разом, де кожен мідлвар не повинен знати, що відбувається до або після нього в ланцюжку
import { createStore, applyMiddleware } from "redux";

//middleware бібліотека, яка дозволяє вам викликати action creator, повертаючи при цьому функцію замість об'єкта. 
//Функція приймає метод dispatch як аргумент, щоб після того, як асинхронна операція завершиться, 
//використовувати його для діспатчінга звичайного синхронного екшену, всередині тіла функції.
import thunk from "redux-thunk";

//Редюсер (reducer) - це чиста функція, яка приймає попередній стан і екшен (state і action) і 
//повертає наступний стан (нову версію попереднього). Функція називається редюсером (reducer) тому, що її можна передати в Array. prototype
import rootReducer from "./reducers";



1. Створення сторінок, також Navbar Footer розподіл між контентом за допомогою switch
2. Створення роутів за допомою react-router-dom
3. Створення store and reducers. Додавання Provider для взаємодії стори з нашими роутами 

*/
