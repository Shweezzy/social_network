import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removePost } from "../../actions/postActions/removePost";
import Spinner from "../../spinnerLoader";
import Moment from "react-moment";

const UserPost = ({ post, removePost, auth }) => {
  return post === null || !post ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
      <div>
        <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment>
      </div>

      <div>
        <p>{post.textOfThePost}</p>
      </div>

      <div>
        <div>
          <div>
            <i></i> {post.likes.length}
          </div>
          <div>
            <i></i>
            {post.comments.length}
          </div>

          <div
            style={{
              display: post.user === auth.user._id ? "block" : "none",
            }}
          >
            <div onClick={() => removePost(post._id)}>DELETE POST</div>
          </div>

          <div>
            <Link to={`/topics/topic/${post._id}`}>View More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  removePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPost);
