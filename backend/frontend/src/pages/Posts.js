import React, { useEffect } from "react";
import { getAllPosts } from "../actions/postActions/getAllPosts";
import { connect } from "react-redux";

import PostsWrapper from "./Posts/PostsWrapper";
import s from "./Posts.module.css";

const Posts = ({ getAllPosts, posts }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <div className={s.container}>
      <div className="input-group" style={{ width: "80%", margin: "auto" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search for a specific post here..."
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          style={{ boxShadow: "none" }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div>
        <PostsWrapper posts={posts.posts} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  getAllPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
