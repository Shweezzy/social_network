import React from "react";
import Posts from "./Posts";

const PostsWrapper = ({ posts }) =>
  posts !== null &&
  posts.length > 0 &&
  posts.map((post) => <Posts post={post} key={post._id} />);

export default PostsWrapper;
