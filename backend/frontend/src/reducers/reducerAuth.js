import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
  AUTH_ERROR,
  USER_IS_LOADED,
  LOG_OUT,
  GET_USERS,
  GET_USER_FOR_PAGE,
} from "../constants/authConstans";

const initialState = {
  token: localStorage.getItem("token"),
  users: [],
  user: {},
  errors: {},
  isLoggedIn: false,
  isAllowedToChangePassword: false,
  isPasswordChanged: false,
  isLoading: false,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_FORM_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
        errors: {},
      };
    case GET_USERS:
      return {
        ...state,
        users: [...payload],
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
        errors: null,
      };
    case AUTH_FORM_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        errors: payload,
        user: {},
        isLoggedIn: false,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
      };
    case USER_IS_LOADED:
      localStorage.getItem("token");
      return {
        ...state,
        ...payload,
        user: payload,
        errors: {},
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
      };
    case GET_USER_FOR_PAGE:
      return {
        ...state,
        users: [...payload],
        isLoggedIn: false,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
        errors: null,
      };
    default:
      return state;
  }
};

export default auth;
