import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import s from "./NavbarLinks.module.css";

const NavbarLinks = ({ isLoggedIn, logOut }) => {
  return (
    <div className={s.contain}>
      <div className={s.body}>
        <Link to="/">
          <Image style={{ width: "100px" }} src={logo} roundedCircle />
        </Link>
      </div>
      <div className={s.links}>
        <Link className={s.buttonSecondary} to="/users">
          <span className={s.Text}>Users</span>
          <span className={s.iconArrow}></span>
        </Link>

        <Link className={s.buttonSecondary} to="/topics">
          <span className={s.Text}>Topics</span>
          <span className={s.iconArrow}></span>
        </Link>

        <Link
          className={s.buttonSecondary}
          style={{ display: isLoggedIn ? "none" : "flex" }}
          to="/login"
        >
          <span className={s.Text}>Log In</span>
          <span className={s.iconArrow}></span>
        </Link>

        <Link
          className={s.buttonSecondary}
          style={{ display: isLoggedIn ? "none" : "flex" }}
          to="/registration"
        >
          <span className={s.Text}>Sign Up</span>
          <span className={s.iconArrow}></span>
        </Link>

        <Link
          className={s.buttonSecondary}
          style={{ display: isLoggedIn ? "flex" : "none" }}
          to="/account"
        >
          <span className={s.Text}>Account</span>
          <span className={s.iconArrow}></span>
        </Link>

        <Link
          className={s.buttonSecondary}
          style={{ display: isLoggedIn ? "flex" : "none" }}
          to="/dashboard"
        >
          <span className={s.Text}>Dashboard</span>
          <span className={s.iconArrow}></span>
        </Link>

        <Link
          className={s.buttonSecondary}
          style={{ display: isLoggedIn ? "flex" : "none" }}
          to="/add-post"
        >
          <span className={s.Text}>Question</span>
          <span className={s.iconArrow}></span>
        </Link>

        <Link
          className={s.buttonSecondary}
          style={{ display: isLoggedIn ? "flex" : "none" }}
          to="/login"
          onClick={() => logOut()}
        >
          <span className={s.Text}>Log Out</span>
          <span className={s.iconArrow}></span>
        </Link>
      </div>
    </div>
  );
};

export default NavbarLinks;
