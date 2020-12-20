import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserById } from "../actions/userActions/getUserById";
import Spinner from "../spinnerLoader";
import UserProfileData from "../components/UserProfile/UserProfile";

import s from "./UserProfile.module.css";

const UserProfile = ({
  users,
  userProfile,
  posts: { post },
  match,
  getUserById,
}) => {
  useEffect(() => {
    //дозволяє отримати параметри з Роута App.js
    getUserById(match.params.user_id);
  }, [getUserById, match.params.user_id]);
  return userProfile === null ? (
    <div className={s.spinner}>
      <Spinner />
    </div>
  ) : (
    <div className={s.container}>
      <UserProfileData userProfile={userProfile} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  userProfile: state.users.userProfile,
  posts: state.posts,
});

export default connect(mapStateToProps, { getUserById })(UserProfile);
