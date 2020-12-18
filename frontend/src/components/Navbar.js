import React from "react";
import { connect } from "react-redux";
import { logOut } from "../actions/authActions/logOut";
import NavbarLinks from "./navbarData/NavbarLinks";
import s from "./Navbar.module.css";

const Navbar = ({ logOut, auth: { isLoggedIn } }) => {
  return (
    <nav className={s.body}>
      <NavbarLinks logOut={logOut} isLoggedIn={isLoggedIn} />
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);
