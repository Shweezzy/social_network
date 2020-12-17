import React from "react";
import { connect } from "react-redux";
import { logOut } from "../actions/authActions/logOut";
import NavbarLinks from "./navbarData/NavbarLinks";

const Navbar = ({ logOut, auth: { isLoggedIn } }) => {
  return (
    <nav>
      <NavbarLinks logOut={logOut} isLoggedIn={isLoggedIn} />
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);
