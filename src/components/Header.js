import React from "react";
import styles from "./index.css";
import { Link } from "react-router-dom";
import GoogleOAuth from "./HandleNews/GoogleOAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu mainMenu">
      <Link to="/" className="ui button primary">
        Main
      </Link>
      <GoogleOAuth />
    </div>
  );
};

export default Header;
