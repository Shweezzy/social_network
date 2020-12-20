import {
  MAKE_POST,
  POST_ERROR,
  GET_POSTS,
  GET_POST,
  CLEAR_POSTS,
  CLEAR_POST,
} from "../constants/postConstants";

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  errors: {},
};

const posts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MAKE_POST:
    case GET_POST:
      return {
        ...state,
        post: payload,
        isLoading: false,
        errors: {},
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        errors: {},
        isLoading: false,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        errors: {},
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        errors: {},
      };
    case POST_ERROR:
      return {
        ...state,
        errors: payload,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default posts;
