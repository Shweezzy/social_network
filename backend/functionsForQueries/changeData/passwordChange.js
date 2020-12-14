const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const err = validationResult(req);

    if (!err.isEmpty()) return res.status(400).json({ err: err.array() });

    let user = await User.findById(req.user.id);

    const salt = await bcryptjs.genSalt(10);

    const hashPassword = await bcryptjs.hash(newPassword, salt);

    user.password = hashPassword;

    await user.save();

    res.json("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
