const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error.");
  }
};
