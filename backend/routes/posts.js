const express = require("express");
const router = express.Router();
const Post = require("../schemas/newPost");
const auth = require("../authentication/auth");
const User = require("../schemas/newUser");
const { check, validationResult } = require("express-validator");

router.get("/posts", async (req, res) => {
  try {
    //вивод всіх постів
    let posts = await Post.find();

    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

//Вирахування лайків
router.get("/posts/liked", async (req, res) => {
  try {
    //Сортуємо
    let posts = await Post.find().sort({
      likes: -1,
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

//Останній пост
router.get("/posts/the_most_recent", async (req, res) => {
  try {
    //Від нового(меншого)
    let posts = await Post.find().sort({
      date: -1,
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

router.get("/posts/the_most_commented", async (req, res) => {
  try {
    //коменти
    let posts = await Post.find().sort({
      comments: -1,
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

//Один певний пост
router.get("/single_post/:post_id", async (req, res) => {
  try {
    //пошук поста по ID з маршрута
    let posts = await Post.findById(req.params.post_id);

    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

router.get("/user_post/:user_id", async (req, res) => {
  try {
    let posts = await Post.find({
      user: req.params.user_id,
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

//Пости користувача
router.get("/user_post", auth, async (req, res) => {
  try {
    //Проходимо аут і зрівнюємо користувачів у БД і запроса, якщо вони підходять, токени правильні
    let posts = await Post.find();

    //Знаходим всі пости з БД і фільтруємо з постами даного користувача
    let userPosts = posts.filter(
      (post) => post.user.toString() === req.user.id.toString()
    );

    res.json(userPosts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

//Додавання нового поста через testOfThePost
router.post(
  "/",
  auth,
  [check("textOfThePost", " Text is required").not().isEmpty()],
  async (req, res) => {
    //Отримуєм дані
    let { textOfThePost } = req.body;

    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    try {
      //провірка користувача через token(user.id)
      let user = await User.findById(req.user.id).select("-password");

      if (!user) return res.status(404).json("User is not found");

      //Створення нового поста, дані з запросу, імя, аватар, користувач з БД
      let newPost = new Post({
        textOfThePost,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //Збереження нового поста
      await newPost.save();

      res.json("Post is created");
    } catch (err) {
      console.error(err);
      return res.status(500).json("Server error");
    }
  }
);

router.put(
  "/search_for_post",
  [check("searchInput", "Search is empty").not().isEmpty()],
  async (req, res) => {
    //отримуємо данні з інпута
    const { searchInput } = req.body;
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    try {
      //вибираємо з БД всі пости
      let posts = await Post.find();
      //якщо пустий інпут - поверне всі пости
      if (searchInput == "") {
        res.json(posts);
      } else {
        //Шукаємо пости в БД по тексту з інпута
        let findPostFromSearchInput = post.filter(
          (post) =>
            post.textOfThePost.toString().toLowerCase().split(" ").join("") ===
            searchInput.toLowerCase().split(" ").join("")
        );
        res.json(findPostFromSearchInput);
      }
    } catch (err) {
      console.error(err);

      return res.status(500).json("Server error");
    }
  }
);

router.put("/likes/:post_id", auth, async (req, res) => {
  try {
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    //беремо id вибраного поста
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post is not found");

    //провірка на наявний лайк у бд зберігається id і user пошук по користувачу
    if (post.likes.find((like) => like.user.toString() === req.user.id))
      return res.status(401).json("the post has already been liked by you");

    //створюємо новий пост
    let newLike = {
      user: req.user.id,
    };

    //добавляємо новий лайк
    post.likes.unshift(newLike);

    //зберігамо
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(err);

    return res.status(500).json("Server error");
  }
});

//Додавання нового комента
router.put(
  "/add_comment/:post_id",
  auth,
  [check("textOfTheComment", "Value is empty").not().isEmpty()],
  async (req, res) => {
    //Отримуємо комент
    const { textOfTheComment } = req.body;

    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    try {
      //Беремо пост з БД
      let post = await Post.findById(req.params.post_id);
      //шукаємо користувача з БД
      let user = await User.findById(req.user.id).select("-password");

      if (!user) return res.status(404).json("User is not found!");

      if (!post) return res.status(404).json("Post is not found");

      //створення нового комента
      let newComment = {
        textOfTheComment,
        name: user.name,
        avatar: user.avatar,
      };

      //Додавання комента
      post.comments.unshift(newComment);

      //збереження
      await post.save();

      res.json("New comment is added");
    } catch (err) {
      console.error(err);
      return res.status(500).json("Server error");
    }
  }
);

router.put("/like_comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });

    let post = await Post.findById(req.params.post_id);

    if (!post) return req.status(404).json("Post is not found");

    const commentFromPost = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );

    if (!commentFromPost) return res.status(404).json("Comment not found");

    const newLike = {
      user: req.user.id,
    };

    commentFromPost.likes.unshift(newLike);

    await post.save();

    res.json("Comment is liked");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

router.delete("/delete_post/:post_id", auth, async (req, res) => {
  try {
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });

    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json("Post is not found");

    if (post.user.toString() !== req.user.id.toString())
      return res.status(401).json("You do not have permission to delete");

    await post.remove();

    res.json("post is remove");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

router.delete(
  "/remove_likes_from_post/:post_id/:like_id",
  auth,
  async (req, res) => {
    try {
      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      let post = await Post.findById(req.params.post_id);

      if (!post) return res.status(404).json("Post is not found");

      const removeLike = post.likes.filter(
        (like) => like.id.toString() !== req.params.like_id.toString()
      );

      post.likes = removeLike;

      await post.save();

      res.json("Like deleted");
    } catch (err) {
      console.error(err);
      return res.status(500).json("Server error");
    }
  }
);
//видалення комента
router.delete("/remove_comment/:comment_id", auth, async (req, res) => {
  try {
    let err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({
        err: err.array(),
      });
    //виборка постів
    let posts = await Post.findById(req.params.post_id);

    if (!posts) return res.status(404).json("Post is not found");
    //створюємо новий без комента
    const removeCommentFromComments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
    );
    //присваюємо новий без комента
    post.comments = removeCommentFromComments;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server error");
  }
});

//видалення лайків з поста
router.delete(
  "/remove_likes_from_comment/:post_id/:comment_id/:like_id",
  auth,
  async (req, res) => {
    try {
      let err = validationResult(req);

      if (!err.isEmpty())
        return res.status(400).json({
          err: err.array(),
        });

      //виборка постів
      let post = await Post.findById(req.params.post_id);

      if (!post) return res.status(404).json("Post is not found");
      //знаходимо пост в БД
      const comment = post.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );
      //фільтруємо новий без лайка
      const removeLikeFromComment = comment.likes.filter(
        (like) => like._id.toString() !== req.params.like_id.toString()
      );
      //присваюємо новий без лайка
      comment.likes = removeLikeFromComment;

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Server error");
    }
  }
);
module.exports = router;
