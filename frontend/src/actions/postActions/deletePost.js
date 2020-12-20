import { REMOVE_POST, POST_ERROR } from "../../constants/postConstants";
import { getUserPosts } from "../userActions/getUserPosts";
import axios from "axios";

export const deletePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:1000/api/posts/delete_post/${post_id}`
    );

    dispatch({ type: REMOVE_POST, payload: res.data });

    dispatch(getUserPosts());
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
