const { validationResult } = require("express-validator");
const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    let { userNameFromSearch } = req.body;

    let err = validationResult(req);

    if (!err.isEmpty()) return res.status(400).json({ err: err.array() });

    let users = await User.find().select("-password");

    let findUserByUsername = users.filter(
      (user) =>
        user.userName.toString().toLowerCase().split(" ").join("") ===
        userNameFromSearch.toString().toLowerCase().split(" ").join("")
    );

    res.json(findUserByUsername);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};
