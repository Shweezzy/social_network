const { validationResult } = require("express-validator");
const Post = require("../../schemas/newPost");

module.exports = async (req, res) => {
  const { inputValue } = req.body;

  const err = validationResult(req);

  if (!err.isEmpty()) return res.status(400).json({ err: err.array() });
  try {
    let posts = await Post.find();

    if (searchInput === "") {
      res.status(401).json(posts);
    } else {
      const findPostByInput = posts.filter(
        (post) =>
          post.textOfThePost.toString().toLowerCase().split(" ").join("") ===
          inputValue.toString().toLowerCase().split(" ").join("")
      );

      res.json(findPostByInput);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
};
