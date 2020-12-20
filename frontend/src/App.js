import React, { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddPost from "./pages/AddPost";
import Account from "./pages/Account";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import Posts from "./pages/Posts";

import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store.js";
import IsLoggedInRoute from "./customRoutes/isLoggedInRoute";
import PrivateRoute from "./customRoutes/privateRoute";

//Зєднує стору з нашими маршрутами
import { Provider } from "react-redux";
import setAuthToken from "./middleware/setAuthToken";
import { userLoaded } from "./actions/authActions/userLoaded";

const App = () => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  //Коли ви викликаєте useEffect, React отримує вказівку запустити вашу функцію з “ефектом” після того, як він відправив зміни
  useEffect(() => {
    store.dispatch(userLoaded());
  }, []);
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        {/* switch - коли один з ваших маршрутів містить вкладений маршрут, якщо у
      вас є точний маршрут на верхньому рівні, ви не можете використовувати
      вкладені маршрути */}
        <Switch>
          {/* exact для строгої рівності */}
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={Users} />
          <Route path="/users/user/:user_id" exact component={UserProfile} />
          <Route path="/posts" exact component={Posts} />

          <IsLoggedInRoute
            path="/registration"
            exact
            component={Registration}
          />
          <IsLoggedInRoute path="/login" exact component={Login} />
          <PrivateRoute path="/add-post" exact component={AddPost} />
          <PrivateRoute path="/account" exact component={Account} />
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
