import { REMOVE_POST, POST_ERROR } from "../../constants/postConstants";
import { getUserPosts } from "../userActions/getUserPosts";
import axios from "axios";

export const removePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:1000/api/posts/delete_post/${post_id}`
    );

    console.log(res);
    dispatch({ type: REMOVE_POST, payload: res.data });

    dispatch(getUserPosts());
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
