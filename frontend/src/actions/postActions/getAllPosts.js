import axios from "axios";
import { GET_POSTS, POST_ERROR } from "../../constants/postConstants";

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:1000/api/posts/getposts");

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
