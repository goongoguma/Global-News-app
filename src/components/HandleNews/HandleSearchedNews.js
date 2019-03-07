import React from "react";
import styles from "../index.css";
import { connect } from "react-redux";
import { searchedNews } from "../../actions";
import { Link } from "react-router-dom";
import history from "../../history";

class HandleSearchedNews extends React.Component {
  state = {
    term: ""
  };

  newsSearchSubmit = e => {
    e.preventDefault();
    this.props.searchedNews(this.state.term);
  };

  HandleContent = () => {
    const { searchResult } = this.props;
    return (
      <div className="HandleSearch">
        <form onSubmit={this.newsSearchSubmit}>
          <div className="ui input">
            <input
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
              placeholder="ex. apple"
            />
          </div>
          <button className="searchButton">Search</button>
        </form>
        <div className="searchResult">
          {!searchResult ? (
            <div>Loading</div>
          ) : (
            searchResult.articles.map((nw, index) => (
              <div className="newsTitleList" key={index}>
                <h2 className="ui header">
                  <span className="newsListOrder">
                    {`${index + 1}.`} <span> </span>
                  </span>
                  <Link
                    to={{
                      pathname: `/news/${nw.title}`,
                      state: { keyword: this.state.term }
                    }}
                    className="header newsList"
                  >
                    {nw.title}
                  </Link>
                </h2>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.HandleContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    searchResult: state.searchedNews.newsList
  };
};

export default connect(
  mapStateToProps,
  { searchedNews }
)(HandleSearchedNews);
