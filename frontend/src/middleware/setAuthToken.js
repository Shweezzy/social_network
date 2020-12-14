import axios from "axios";

//призначаємо до заголовків по замовчуванню token, який буде забиратись з LS
const setAuthToken = (token) => {
  if (token) axios.defaults.headers.common["authentication-token"] = token;
  else delete axios.defaults.headers.common["authentication-token"];
};

export default setAuthToken;
