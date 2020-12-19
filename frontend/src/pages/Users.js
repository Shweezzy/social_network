import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/userActions/getUsers";
import UsersWrapper from "./Users/UserWrapper";

import s from "./Users.module.css";
const Users = ({ getUsers, auth }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className={s.container}>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <UsersWrapper users={auth.users} key={auth._id} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers })(Users);
