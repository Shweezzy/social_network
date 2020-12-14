import React, { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store.js";

//Зєднує стору з нашими маршрутами
import { Provider } from "react-redux";
import setAuthToken from "./middleware/setAuthToken";
import { userLoaded } from "./actions/authActions";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
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
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer />
      </Provider>
    </Router>
  );
};

export default App;
