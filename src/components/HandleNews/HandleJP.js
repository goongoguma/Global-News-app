import React from "react";
import styles from "../index.css";
import { connect } from "react-redux";
import { countryNews } from "../../actions/index";
import { Link } from "react-router-dom";
import history from "../../history";

class HandleJP extends React.Component {
  state = { countryCode: "jp" };
  componentDidMount() {
    this.props.countryNews(this.state.countryCode);
  }

  HandleContent = () => {
    if (!this.props.news) {
      return (
        <div className="ui segment">
          <div className="ui active dimmer">
            <div className="ui active inverted dimmer">Loading...</div>
          </div>
        </div>
      );
    }

    if (!this.props.isSignedIn) {
      history.push("/");
    }

    return this.props.news.articles.map((nw, index) => (
      <div className="newsTitleList" key={nw.title}>
        <h2 className="ui header">
          <span className="newsListOrder">
            {`${index + 1}.`} <span> </span>
          </span>
          <Link
            to={{
              pathname: `/news/${nw.title}`,
              state: { countryCode: this.state.countryCode }
            }}
            className="header newsList"
          >
            {nw.title}
          </Link>
        </h2>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1 className="sectionTitle">Japan Top 20 Headlines</h1>
        {this.HandleContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    news: state.news.newsList
  };
};

export default connect(
  mapStateToProps,
  { countryNews }
)(HandleJP);
