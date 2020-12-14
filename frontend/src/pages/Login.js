import React, { useState } from "react";
import { loginUser } from "../actions/authActions";
import { connect } from "react-redux";

const Login = ({ loginUser }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  //призначаємо в useData з кожного інпута значення userData.name-lastName-userName. Має вигляд userData[name або lastName...] = e.target.value
  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  return (
    <div>
      <div>
        <labe>email</labe>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <br />
      <div>
        <labe>password</labe>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <hr></hr>
      <button onClick={() => loginUser(userData)}>Submit form</button>
    </div>
  );
};

export default connect(null, { loginUser })(Login);
