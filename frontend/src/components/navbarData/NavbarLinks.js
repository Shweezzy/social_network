import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../logo.png";

const NavbarLinks = ({ isLoggedIn, logOut }) => {
  return (
    <div style={{ margin: "0px" }}>
      <Link to="/">
        <Image style={{ width: "10%" }} src={logo} roundedCircle />
      </Link>
      <Link to="/users">Users</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/login" style={{ display: isLoggedIn ? "none" : "flex" }}>
        Log In
      </Link>
      <Link
        to="/registration"
        style={{ display: isLoggedIn ? "none" : "flex" }}
      >
        Sign Up
      </Link>
      <Link to="/account" style={{ display: isLoggedIn ? "flex" : "none" }}>
        Account
      </Link>
      <Link to="/dashboard" style={{ display: isLoggedIn ? "flex" : "none" }}>
        Dashboard <i className="fas fa-user"></i>
      </Link>
      <Link to="/add-post" style={{ display: isLoggedIn ? "flex" : "none" }}>
        Add question
      </Link>
      <Link
        to="/login"
        onClick={() => logOut()}
        style={{ display: isLoggedIn ? "flex" : "none" }}
      >
        Log Out
      </Link>
    </div>
  );
};

export default NavbarLinks;
