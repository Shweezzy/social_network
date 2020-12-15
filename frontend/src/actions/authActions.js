import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
  AUTH_ERROR,
  USER_IS_LOADED,
  LOG_OUT,
} from "../constants/constans";
import axios from "axios";
import setAuthToken from "../middleware/setAuthToken";
//actions - дії
export const userLoaded = () => async (dispatch) => {
  //якщо у ls збережений токен
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    //Вибирає користувача по token
    const res = await axios.get("http://localhost:1000/api/users/");
    //відсилає в редюсери
    dispatch({ type: USER_IS_LOADED, payload: res.data });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Генератори дій (actions creators) - це функції, що створюють дії.
export const registerUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "COntent-Type": "application/json",
      },
    };
    //Сюда приходять { name, lastName, userName, email, password
    const body = JSON.stringify(userData);

    const response = await axios.post(
      "http://localhost:1000/api/users/register",
      body,
      config
    );
    //відсилає в редюсери
    dispatch({ type: AUTH_FORM_SUCCESS, payload: response.data });

    dispatch(userLoaded());
  } catch (err) {
    dispatch({
      type: AUTH_FORM_FAIL,
      payload: "REJECTED",
    });
  }
};
//Генератори дій (actions creators) - це функції, що створюють дії.
export const loginUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "COntent-Type": "application/json",
      },
    };
    //Сюда приходять { name, lastName, userName, email, password
    const body = JSON.stringify(userData);

    const response = await axios.post(
      "http://localhost:1000/api/users/login",
      body,
      config
    );
    //відсилає в редюсери
    dispatch({ type: AUTH_FORM_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({
      type: AUTH_FORM_FAIL,
      payload: "REJECTED",
    });
  }
};
//Генератори дій (actions creators) - це функції, що створюють дії.
export const logOut = () => (dispatch) => {
  //відсилає в редюсери
  dispatch({ type: LOG_OUT });
};
