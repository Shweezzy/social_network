import {
  MAKE_POST,
  GET_USER_POSTS,
  GET_POST_BY_USER_ID,
  GET_POST,
  GET_POSTS,
  CLEAR_POSTS,
  CLEAR_POST,
  SEARCH_FOR_POST,
  SORT_POSTS_BY_LIKES,
  SORT_POSTS_BY_COMMENTS,
  SORT_POSTS_BY_DATE,
  ADD_LIKE,
  ADD_COMMENT,
  ADD_LIKE_COMMENT,
  REMOVE_LIKE_FROM_COMMENT,
  REMOVE_COMMENT,
  REMOVE_POST,
  REMOVE_LIKE,
  POST_ERROR,
} from "../constants/postConstants";

const posts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default posts;
