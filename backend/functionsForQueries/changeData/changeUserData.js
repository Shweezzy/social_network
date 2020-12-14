const { validationResult } = require("express-validator");
const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    const { changeData } = req.body;

    const err = validationResult(req);

    if (!err.isEmpty()) return res.status(400).json({ err: err.array() });

    let user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json("User is not found");

    //userDataToChange -> name,lastName,userName

    let userDataToChange = req.params.user_data_to_change.toString();

    if (user[userDataToChange] === changeData.toString())
      return res
        .status(401)
        .json("This data is already implicit in the database");

    user[userDataToChange] = changeUserData.toString();

    await user.save();

    res.json("data has been changed");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
