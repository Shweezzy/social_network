import axios from "axios";
import { GET_USER_BY_ID, USER_ERROR } from "../../constants/userConstants";

export const getUserById = (user_id) => async (dispatch) => {
  try {
    console.log("here");
    const res = await axios.get(
      `http://localhost:1000/api/users/get_user_by_id/${user_id}`
    );
    dispatch({ type: GET_USER_BY_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
