import React from "react";
//перенаправляє користувача на вказаний роут
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const IsLoggedInRoute = ({
  component: Component,
  auth: { isLoggedIn },
  ...rest
}) => (
  <Route
    {...rest}
    render={(
      props //коли не виконаний вхід переходить інакше залишається на компоненті з пропсами
    ) => (isLoggedIn ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(IsLoggedInRoute);
