import { CLEAR_POST, POST_ERROR } from "../../constants/postConstants";

export const clearPost = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
