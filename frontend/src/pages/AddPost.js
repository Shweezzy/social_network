import React from "react";
import { connect } from "react-redux";
import { clearPost } from "../actions/postActions/clearPost";
import { createPost } from "../actions/postActions/createPost";
import CreatePost from "../components/AddPost/CreatePost";
import Output from "../components/AddPost/Output";

import s from "./AddPost.module.css";
const AddPost = ({ clearPost, createPost, posts: { post } }) => {
  setTimeout(() => {
    clearPost();
  }, 10000);

  return (
    <div className={s.container}>
      {post === null ? (
        <CreatePost createPost={createPost} />
      ) : (
        <Output clearPost={clearPost} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  createPost,
  clearPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
