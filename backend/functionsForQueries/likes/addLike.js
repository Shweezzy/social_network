const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post is not found");

    if (
      post.likes.find((like) => like.user.toString() === req.user.id.toString())
    )
      return res.status(401).json("You already like the post");

    let newLike = {
      user: req.user.id,
    };

    post.likes.unshift(newLike);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
