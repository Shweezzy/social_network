import { LOG_OUT } from "../../constants/authConstans";

export const logOut = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
