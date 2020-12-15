const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post is not found");

    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );

    const removeLikeComment = comment.likes.filter(
      (like) => like._id !== req.params.like_id
    );

    comment.likes = removeLikeComment;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
