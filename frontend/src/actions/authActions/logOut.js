import { LOG_OUT } from "../../constants/auth.constans";
export const logOut = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
