//метод, який дозволяє замість того, щоб створювати один величезний reducer для всього стану додатки відразу,
//розбивати його на окремі модулі
import { combineReducers } from "redux";
import users from "./reducerUsers";
import posts from "./reducerPost";
import auth from "./reducerAuth";

export default combineReducers({
  users,
  posts,
  auth,
});
