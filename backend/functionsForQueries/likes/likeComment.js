const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post is not found");

    const commentPost = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );

    if (!commentPost) return res.status(404).json("Comment is not found");

    let newLike = {
      user: req.user.id,
    };

    commentPost.likes.unshift(newLike);

    await post.save();

    res.json("Comment is liked");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
