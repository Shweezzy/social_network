import axios from "axios";
import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
} from "../../constants/auth.constans";
import { userLoaded } from "../authActions/userLoaded";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(userData);

    const response = await axios.post(
      "http://localhost:1000/api/users/login",
      body,
      config
    );
    console.log(userData);
    dispatch({
      type: AUTH_FORM_SUCCESS,
      payload: response.data,
    });
    dispatch(userLoaded());
  } catch (error) {
    dispatch({
      type: AUTH_FORM_FAIL,
      payload: error,
    });
  }
};
