import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../actions/userActions/getUserPosts";
import UserPostsWrapper from "./UserPosts/UserPostsWrapper";
import AccountPageSection from "../components/AccountPage/AccountPageSection";

const Account = ({
  getUserPosts,
  auth: { name, lastName, userName, avatar, email },
  users: { profilePosts },
}) => {
  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);
  console.log({ name, lastName, userName, avatar, email });
  return (
    <div>
      <div>
        <img src={avatar} alt="" />

        <AccountPageSection
          name={name}
          lastName={lastName}
          email={email}
          userName={userName}
        />
      </div>

      <div>
        <header>
          {profilePosts !== null || profilePosts !== [] ? (
            <p>Your topics</p>
          ) : (
            <p>You haven't made any posts yet</p>
          )}
        </header>
        <UserPostsWrapper posts={profilePosts} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getUserPosts })(Account);
