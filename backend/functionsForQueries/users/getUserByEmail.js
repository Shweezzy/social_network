const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.user_email }).select(
      "-password"
    );

    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
