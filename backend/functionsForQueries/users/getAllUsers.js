const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    let users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error.");
  }
};
