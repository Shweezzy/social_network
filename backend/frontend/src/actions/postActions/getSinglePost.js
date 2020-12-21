import { GET_POST, POST_ERROR } from "../../constants/postConstants";
import axios from "axios";

export const getSinglePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:1000/api/posts/single_post/${post_id}`
    );
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
