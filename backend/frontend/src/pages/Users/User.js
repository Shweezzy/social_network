import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import s from "./User.module.css";

const User = ({ user }) => {
  return (
    <div className={s.container}>
      <div className={s.text}>
        <img className={s.img} src={user.avatar} alt="avatar" />

        <p>{user.userName}</p>
        <hr className={s.hr} />
      </div>

      <div>
        <Link to={`/users/user/${user._id}`}>
          <Button
            variant="outline-info"
            style={{
              width: "20%",
              fontSize: "10%",
              textAlign: "center",
            }}
          >
            <span className={s.span}> Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default User;
