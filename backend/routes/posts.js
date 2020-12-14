const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createPostValidator,
  searchForPostValidator,
  addCommentValidator,
} = require("../middleware/validator");
const getPosts = require("../functionsForQueries/posts/getPosts");
const sortPostsByLikes = require("../functionsForQueries/posts/sortPostsByLikes");
const sortPostsByDate = require("../functionsForQueries/posts/sortPostsByDate");
const sortPostsByComments = require("../functionsForQueries/posts/sortPostsByComments");
const getSinglePost = require("../functionsForQueries/posts/getSinglePost");
const getPostsUserByMiddleware = require("../functionsForQueries/posts/getPostsUserByMiddleware");
const getUserPostsById = require("../functionsForQueries/posts/getUserPostsById");
const addPost = require("../functionsForQueries/posts/addPost");
const postSearch = require("../functionsForQueries/posts/postSearch");
const addLike = require("../functionsForQueries/likes/addLike");
const addComment = require("../functionsForQueries/comments/addComment");
const likeComment = require("../functionsForQueries/likes/likeComment");
const deletePost = require("../functionsForQueries/posts/deletePost");
const deleteLikePost = require("../functionsForQueries/likes/deleteLikePost");
const deleteComment = require("../functionsForQueries/comments/deleteComment");
const deleteLikeComment = require("../functionsForQueries/likes/deleteLikeComment");

router.get("/posts", getPosts);

router.get("/posts/most_liked", sortPostsByLikes);

router.get("/posts/the_most_recent", sortPostsByDate);

router.get("/posts/the_most_commented", sortPostsByComments);

router.get("/single_post/:post_id", getSinglePost);

router.get("/user_posts/:user_id", getUserPostsById);

router.get("/user_posts", auth, getPostsUserByMiddleware);

router.post("/", auth, createPostValidator, addPost);

router.put("/search_for_post", searchForPostValidator, postSearch);

router.put("/likes/:post_id", auth, addLike);

router.put("/add_comment/:post_id", auth, addCommentValidator, addComment);

router.put("/like_comment/:post_id/:comment_id", auth, likeComment);

router.delete("/delete_post/:post_id", auth, deletePost);

router.delete("/remove_like_from_post/:post_id/:like_id", auth, deleteLikePost);

router.delete("/remove_comment/:post_id/:comment_id", auth, deleteComment);

router.delete(
  "/remove_like_from_comment/:post_id/:comment_id/:like_id",
  auth,
  deleteLikeComment
);

module.exports = router;
