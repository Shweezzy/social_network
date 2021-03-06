import { MAKE_POST, POST_ERROR } from "../../constants/postConstants";
import axios from "axios";

export const createPost = (textOfThePost) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ textOfThePost });

    const res = await axios.post(
      `http://localhost:1000/api/posts`,
      body,
      config
    );

    dispatch({ type: MAKE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
