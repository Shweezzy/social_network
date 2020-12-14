const { validationResult } = require("express-validator");
const Post = require("../../schemas/newPost");
const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  let { textOfThePost } = req.body;

  const err = validationResult(req);

  if (!err.isEmpty()) return res.status(400).json({ err: err.array() });
  try {
    let user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json("User is not found");

    let newPost = new Post({
      textOfThePost,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    await newPost.save();

    res.json("Post created");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
