const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createPostValidator,
  searchForPostValidator,
  addCommentValidator,
} = require("../middleware/validator");

const sortPostsByLikes = require("../functionsForQueries/posts/sortPostsByLikes");
const sortPostsByDate = require("../functionsForQueries/posts/sortPostsByDate");
const sortPostsByComments = require("../functionsForQueries/posts/sortPostsByComments");

const getPosts = require("../functionsForQueries/posts/getPosts");
const getSinglePost = require("../functionsForQueries/posts/getSinglePost");
const getPostsUserByMiddleware = require("../functionsForQueries/posts/getPostsUserByMiddleware");
const getUserPostById = require("../functionsForQueries/posts/getUserPostById");

const postSearch = require("../functionsForQueries/posts/postSearch");
const addPost = require("../functionsForQueries/posts/addPost");

const addLike = require("../functionsForQueries/likes/addLike");
const addComment = require("../functionsForQueries/comments/addComment");
const likeComment = require("../functionsForQueries/likes/likeComment");

const deletePost = require("../functionsForQueries/posts/deletePost");
const deleteLikePost = require("../functionsForQueries/likes/deleteLikePost");
const deleteComment = require("../functionsForQueries/comments/deleteComment");
const deleteLikeFromComment = require("../functionsForQueries/likes/deleteLikeFromComment");

router.get("/getposts", getPosts);

router.get("/posts/sortPostsByLikes", sortPostsByLikes);

router.get("/posts/sortPostsByDate", sortPostsByDate);

router.get("/posts/sortPostsByComments", sortPostsByComments);

router.get("/single_post/:post_id", getSinglePost);

router.get("/user_post/:user_id", getUserPostById);

router.get("/user_posts", auth, getPostsUserByMiddleware);

router.post("/", auth, createPostValidator, addPost);

router.put("/search_for_post", searchForPostValidator, postSearch);

router.put("/likes/:post_id", auth, addLike);

router.put("/add_comment/:post_id", auth, addCommentValidator, addComment);

router.put("/like_comment/:post_id/:comment_id", auth, likeComment);

router.delete("/delete_post/:post_id", auth, deletePost);

router.delete("/delete_like_from_post/:post_id/:like_id", auth, deleteLikePost);

router.delete("/delete_comment/:post_id/:comment_id", auth, deleteComment);

router.delete(
  "/remove_like_from_comment/:post_id/:comment_id/:like_id",
  auth,
  deleteLikeFromComment
);

module.exports = router;
