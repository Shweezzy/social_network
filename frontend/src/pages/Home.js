import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import s from "./Home.module.css";

const Home = () => {
  return (
    <div className={s.contain}>
      <div className={s.firstBlock}>
        <div>
          <h2>
            Welcome in <b className={s.bold}>Desire</b>
          </h2>
        </div>

        <div>
          This is a new forum for a simple enthusiast.
          <br />
          The project was developed for educational purposes
          <br />
          <ul>
            <li>You just want to share Your story?</li>
            <li>Find like-minded people in your field and not only?</li>
            <li>Just scoop up new information at your leisure?</li>
          </ul>
          <div>
            <Link to="/registration">
              <Button variant="outline-info">Register in</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={s.secondBlock}>
        <img src={logo} className={s.logo} alt="" />
      </div>
    </div>
  );
};

export default Home;
