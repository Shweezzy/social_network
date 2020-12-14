const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  try {
    let posts = await Post.find().sort({ comments: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
