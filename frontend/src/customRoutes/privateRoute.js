import React from "react";
//перенаправляє користувача на будьякий роут
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { BrowserRouter as Route } from "react-router-dom";

const privateRoute = ({
  component: Component,
  auth: { isLoggedIn },
  ...rest
}) => (
  <Route
    {...rest}
    render={(
      props //коли виконаний вхід переходить інакше залишається на компоненті з пропсами
    ) => (isLoggedIn ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(privateRoute);
