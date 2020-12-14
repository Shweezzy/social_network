//Метод composeWithDevTools це покращений метод compose, який автоматично додає devtools до всього, що ми передали йому всередину
import { composeWithDevTools } from "redux-devtools-extension";
//Mідлвар (middleware) - це пропонований спосіб розширення Redux за допомогою настроюваних функцій.
//Ключовою особливістю мідлвара є те, що вони компонуються.
//Кілька мідлваров можна об'єднати разом, де кожен мідлвар не повинен знати, що відбувається до або після нього в ланцюжку
import { createStore, applyMiddleware } from "redux";
//middleware бібліотека, яка дозволяє вам викликати action creator, повертаючи при цьому функцію замість об'єкта.
//Функція приймає метод dispatch як аргумент, щоб після того, як асинхронна операція завершиться,
//використовувати його для діспатчінга звичайного синхронного екшену, всередині тіла функції.
import thunk from "redux-thunk";
//Редюсер (reducer) - це чиста функція, яка приймає попередній стан і екшен (state і action) і
//повертає наступний стан (нову версію попереднього). Функція називається редюсером (reducer) тому, що її можна передати в Array. prototype
import rootReducer from "./reducers";

//У нас є список дій (Actions) і наш редюсер (Reducers), який може обробляти наші дії

const middleware = [thunk];

//початковий стан
const initialState = {};

//1 аргумент - редюсер, 2 - початковий стан, 3
const Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
