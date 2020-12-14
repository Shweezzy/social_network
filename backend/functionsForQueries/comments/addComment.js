const { validationResult } = require("express-validator");
const Post = require("../../schemas/newPost");
const User = require("../../schemas/newUser");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    let user = await User.findById(req.user.id).select("-password");

    const { textOfTheComment } = req.body;

    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ err: err.array() });

    if (!user) return res.status(404).json("User is not found");

    if (!post) return res.status(404).json("Post is not found");

    let newComment = {
      textOfTheComment,
      name: user.name,
      avatar: user.avatar,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json("comment added");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
