const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post is not found");

    const removeLikePost = post.likes.filter(
      (like) => like.id.toString() !== req.params.like_id.toString()
    );

    post.likes = removeLikePost;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
