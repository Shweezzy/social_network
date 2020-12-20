import { GET_USER_FOR_PAGE } from "../../constants/authConstans";
import { USER_ERROR } from "../../constants/userConstants";
import axios from "axios";

export const getUsersForPage = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:1000/api/users/users`);

    dispatch({ type: GET_USER_FOR_PAGE, payload: res.data });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};
