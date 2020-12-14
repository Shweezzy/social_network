const { validationResult } = require("express-validator");
const User = require("../../schemas/newUser");
const bcryptjs = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { passwordToCheck } = req.body;

    const err = validationResult(req);

    if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });

    let user = await User.findById(req.user.id);

    let doPasswordsMatch = await bcryptjs.compare(
      passwordToCheck,
      user.password
    );

    if (!doPasswordsMatch)
      return res.status(401).json("Passwords do not match");

    res.json("success");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
