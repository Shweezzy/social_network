import { GET_USERS, USER_ERROR } from "../../constants/userConstants";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:1000/api/users/users`);

    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};
