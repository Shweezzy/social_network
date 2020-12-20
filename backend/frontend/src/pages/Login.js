import React, { useState } from "react";
import { loginUser } from "../actions/authActions/loginUser";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import s from "./Login.module.css";

import { Form, Button } from "react-bootstrap";

const Login = ({ loginUser, error }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });
  return (
    <div className={s.container}>
      <div className={s.body}>
        <div className={s.form}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail address</Form.Label>
              <Form.Control
                className={s.formControl}
                type="email"
                name="email"
                value={email}
                placeholder="Enter e-mail"
                onChange={(e) => onChange(e)}
              />
              <Form.Text className={s.textMuted}>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={s.formControl}
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Text className={s.textMuted}>
              If you have not created your account yet,
              <br /> please register
            </Form.Text>
            {error && (error !== null || error !== "" || error !== {}) && (
              <ErrorMessage errorMessage="Wrong e-mail or password..." />
            )}
            <div className={s.btn}>
              <Button
                onClick={(e) => loginUser(userData)}
                variant="outline-info"
              >
                Log in
              </Button>
              <Link to="/registration">
                <Button variant="outline-info">Sign up</Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
