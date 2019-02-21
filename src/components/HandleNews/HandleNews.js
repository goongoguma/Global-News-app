import React from "react";
import styles from "../index.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HandleSearchedNews from "./HandleSearchedNews";

class HandleNews extends React.Component {
  newsSection() {
    return (
      <div className="countryWrapper">
        <h1 className="mainTitle">Todays's World Top 20 Headlines</h1>
        <div className="ui three item menu">
          <Link to="/news/us" className="item">
            US
          </Link>
          <Link to="/news/kr" className="item">
            KOREA
          </Link>
          <Link to="/news/jp" className="item">
            JAPAN
          </Link>
        </div>
        <HandleSearchedNews />
      </div>
    );
  }

  render() {
    return <div>{this.newsSection()}</div>;
  }
}

export default HandleNews;
