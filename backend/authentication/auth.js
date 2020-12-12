const config = require("config");
const jwt = require("jsonwebtoken");

//беремо токен з запроса і зрівнюємо з токеном config.get('jsonwebtoken)
//кожен користувач має токен з id
module.exports = (req, res, next) => {
  const token = req.header("authentication-token");
  const decode = jwt.verify(token, config.get("jsonwebtoken"));

  //якщо співпадають - користувач декодується
  //залишається тільки id -users.js(let payload = { user: {id: newUser.id}};)

  req.user = decode.user;
  next();
};
