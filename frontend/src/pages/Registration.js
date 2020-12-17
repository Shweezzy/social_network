import React, { useState } from "react";
import { registerUser } from "../actions/authActions/registerUser";
//Якщо вам, в React-компоненті, потрібно отримувати дані зі сховища, або потрібно діспетчеризувати дії
import { connect } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import { Form, Button } from "react-bootstrap";

import s from "./Registration.module.css";

const Registration = ({ registerUser, error }) => {
  const [hasPasswordShowed, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const { name, lastName, userName, email, password } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  return (
    <div className={s.container}>
      <div className={s.body}>
        <Form className={s.form}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter last name"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={userName}
              placeholder="User name"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => onChange(e)}
            />
            <Form.Text className={s.textMuted}>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type={hasPasswordShowed ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => onChange(e)}
            />
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Show password"
                onClick={() => setShowPassword(!hasPasswordShowed)}
                className={hasPasswordShowed ? s.show : s.unShow}
              />
            </Form.Group>
            <Form.Text className={s.textMuted}>
              Password must have at least 6 letters
            </Form.Text>
          </Form.Group>
          {error && (error !== null || error !== "" || error !== {}) && (
            <ErrorMessage
              errorMessage="
            please check if the data is correct"
            />
          )}

          <Button
            variant="primary"
            type="submit"
            onClick={() => registerUser(userData)}
          >
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.errors,
});

export default connect(mapStateToProps, { registerUser })(Registration);
