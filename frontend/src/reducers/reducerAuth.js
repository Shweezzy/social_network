//консанти
import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
  AUTH_ERROR,
  USER_IS_LOADED,
  LOG_OUT,
} from "../constants/constans";

//початковий(за замовчуванням)
const initialState = {
  token: localStorage.getItem("token"),
  users: {},
  user: {},
  isLogged: false,
  isAllowedToChangePassword: false,
  isPasswordChanged: false,
  isLoading: false,
};

//Редюсери приймають аргументи: стан, встановлене як початковий стан за замовчуванням (Initial state), і дію (Action).
//Ця дія допомагає редюсеру визначити, що необхідно зробити зі станом.
const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    //наявний токен пройшла auth
    case AUTH_FORM_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isLogged: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
      };
    //token не пройшов auth - видалення token
    case AUTH_FORM_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        user: {},
        isLogged: false,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
      };
    //загружає користувача
    case USER_IS_LOADED:
      localStorage.getItem("token");
      return {
        ...state,
        ...payload,
        user: payload,
        isLogged: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default auth;
