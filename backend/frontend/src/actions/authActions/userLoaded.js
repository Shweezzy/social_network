import axios from "axios";
import { USER_IS_LOADED, AUTH_ERROR } from "../../constants/authConstans";
import setAuthToken from "../../middleware/setAuthToken";

export const userLoaded = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const response = await axios.get("http://localhost:1000/api/users");

    dispatch({
      type: USER_IS_LOADED,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
