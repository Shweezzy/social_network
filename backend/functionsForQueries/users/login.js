const { validationResult } = require("express-validator");
const User = require("../../schemas/newUser");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    let err = validationResult(req);

    if (!err.isEmpty()) return res.status(400).json({ err: err.array() });

    if (!user)
      return res
        .status(404)
        .send("User with this e-mail hasn't been created yet");

    let checkedPassword = await bcryptjs.compare(password, user.password);

    if (!checkedPassword)
      return res.status(401).json({ msg: "Passwords do not match" });

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jsonwebtoken"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};
