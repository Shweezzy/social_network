const { check } = require("express-validator");

module.exports.registerUserValidator = [
  check("name", "Value is empty").not().isEmpty(),
  check("lastName", "Value name is empty").not().isEmpty(),
  check("userName", "Value is empty").not().isEmpty(),
  check("email", "Value is empty").isEmail(),
  check("password", "Password has to be 6 letter and below 12").isLength({
    min: 6,
    max: 12,
  }),
];

module.exports.loginUserValidator = [
  check("email", "Value is empty").isEmail(),
  check("password", "Password has to be 6 letter and below 12").isLength({
    min: 6,
  }),
];

module.exports.searchUserByUsernameValidator = [
  check("userNameFromSearch", "Search is empty").not().isEmpty(),
];

module.exports.changeUserDataValidator = [
  check("changeUserData", "Input is empty").not().isEmpty(),
];

module.exports.checkActualPasswordValidator = [
  check(
    "passwordToCheck",
    "Password has to be 6 letter and below 12"
  ).isLength({ min: 6, max: 12 }),
];

module.exports.changeUserPasswordValidator = [
  check("newPassword", "Password has to be 6 letter and below 12").isLength({
    min: 6,
    max: 12,
  }),
];

module.exports.createPostValidator = [
  check("textOfThePost", "Text is required").not().isEmpty(),
];

module.exports.searchForPostValidator = [
  check("searchInput", "Search is empty").not().isEmpty(),
];

module.exports.addCommentValidator = [
  check("textOfTheComment", "Text is empty").not().isEmpty(),
];
