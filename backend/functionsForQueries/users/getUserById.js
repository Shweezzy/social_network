const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    let user = await User.findById(req.params.user_id).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};
