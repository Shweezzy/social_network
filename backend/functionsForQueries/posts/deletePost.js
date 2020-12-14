const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post is not found");

    if (post.user !== req.user.id)
      return res.status(401).json("You do not have access to this action");

    await post.remove();

    res.json("Post deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
