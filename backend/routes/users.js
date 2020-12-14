const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const getUserByMiddleware = require("../functionsForQueries/users/getUserByMiddleware");
const getUserByEmail = require("../functionsForQueries/users/getUserByEmail");
const getAllUsers = require("../functionsForQueries/users/getAllUsers");
const getUserById = require("../functionsForQueries/users/getUserById");
const registration = require("../functionsForQueries/users/registration");
const login = require("../functionsForQueries/users/login");

const {
  registerUserValidator,
  loginUserValidator,
  searchUserByUsernameValidator,
  changeUserDataValidator,
  checkActualPasswordValidator,
  changeUserPasswordValidator,
} = require("../middleware/validator");
const searchByUserName = require("../functionsForQueries/users/searchByUserName");
const changeUserData = require("../functionsForQueries/changeData/changeUserData");
const checkActualPassword = require("../functionsForQueries/users/checkActualPassword");
const passwordChange = require("../functionsForQueries/changeData/passwordChange");

router.get("/", auth, getUserByMiddleware);

router.get("/get_user_by_email/:user_email", getUserByEmail);

router.get("/users", getAllUsers);

router.get("/get_user_by_id/:user_id", getUserById);

router.post("/register", registerUserValidator, registration);

router.post("/login", loginUserValidator, login);

router.put(
  "/search_by_username",
  searchUserByUsernameValidator,
  searchByUserName
);

router.put(
  "/change_user_data/:user_data_to_change",
  auth,
  changeUserDataValidator,
  changeUserData
);

router.put(
  "/check_acutal_password",
  auth,
  checkActualPasswordValidator,
  checkActualPassword
);

router.put(
  "/change_user_password",
  auth,
  changeUserPasswordValidator,
  passwordChange
);

module.exports = router;
