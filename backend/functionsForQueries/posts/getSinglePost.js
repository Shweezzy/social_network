const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  try {
    let singlePost = await Post.findById(req.params.post_id);

    res.json(singlePost);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
