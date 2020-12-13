import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
