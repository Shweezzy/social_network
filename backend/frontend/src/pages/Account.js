import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserPosts } from "../actions/userActions/getUserPosts";
import UserPostsWrapper from "./UserPosts/UserPostsWrapper";
import AccountPage from "../components/AccountPage/AccountPage";

import { Card } from "react-bootstrap";
import s from "./Account.module.css";
const Account = ({
  getUserPosts,
  auth: { name, lastName, userName, avatar, email },
  users: { profilePosts },
}) => {
  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);
  return (
    <div className={s.contain}>
      <div className={s.accountSection}>
        <img src={avatar} alt="" />
        <AccountPage
          name={name}
          lastName={lastName}
          email={email}
          userName={userName}
        />
      </div>

      <div style={{ marginTop: "2%" }}>
        <h6>Your awesome posts:</h6>

        <Card style={{ opacity: "0.9", width: "60%", margin: "auto" }}>
          <Card.Body>
            <UserPostsWrapper posts={profilePosts} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getUserPosts })(Account);
