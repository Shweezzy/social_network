import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearPost } from "../actions/postActions/clearPost";
import { getSinglePost } from "../actions/postActions/getSinglePost";
import Spinner from "../spinnerLoader";
import PostDetail from "./SinglePost/PostDetail";

import s from "./PostPage.module.css";

const TopicPage = ({ clearPost, getSinglePost, match, auth, post }) => {
  useEffect(() => {
    clearPost();
    getSinglePost(match.params.post_id);
  }, [clearPost, getSinglePost, match.params.post_id]);

  return post === null || post === [] ? (
    <div className={s.spinner}>
      <Spinner />
    </div>
  ) : (
    <div>
      <PostDetail post={post} auth={auth} />
    </div>
  );
};

const mapDispatchToProps = {
  clearPost,
  getSinglePost,
};

const mapStateToProps = (state) => ({
  post: state.posts.post,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);
