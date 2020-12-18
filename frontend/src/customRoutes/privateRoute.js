import React from "react";
//перенаправляє користувача на будьякий роут
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isLoggedIn },
  ...rest
}) => (
  <Route
    {...rest}
    render={(
      props //коли виконаний вхід переходить інакше залишається на компоненті з пропсами
    ) => (!isLoggedIn ? <Redirect to="/login" /> : <Component {...props} />)}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
