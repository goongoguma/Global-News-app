import React from "react";
import styles from "../index.css";
import { connect } from "react-redux";
import { countryNews } from "../../actions/index";
import history from "../../history";

class HandleNewsDetail extends React.Component {
  componentDidMount() {
    this.props.countryNews(this.props.location.state.countryCode);
  }

  newPageOpen(nw) {
    return window.open(`${nw.url}`);
  }

  HandleFormat = nw => {
    return (
      <div className="newsDetailPage">
        <h1 className="ui header">{nw.title}</h1>
        <img
          src={!nw.urlToImage ? "No Image" : nw.urlToImage}
          alt="news images"
        />
        <div className="ui card">
          <div className="content">
            <p>Author : {!nw.author ? "No author" : nw.author}</p>
          </div>
        </div>
        <div className="ui card">
          <div className="right floated content">
            <div>Published At : {nw.publishedAt}</div>
          </div>
        </div>
        <div className="newsDesc">{nw.description}</div>
        <button className="ui button backtoList" onClick={this.BackTotheList}>
          Back to the List
        </button>
        <button onClick={() => this.newPageOpen(nw)} className="ui button">
          News Detail
        </button>
      </div>
    );
  };

  BackTotheList = () => {
    history.push(`/news/${this.props.location.state.countryCode}`);
  };

  HandleContent = () => {
    const { newsDetail } = this.props;
    if (!newsDetail) {
    }

    if (newsDetail) {
      return newsDetail.articles.map(nw =>
        nw.title === this.props.match.params.id ? (
          <div key={nw.title}>
            <div>{this.HandleFormat(nw)} </div>
          </div>
        ) : null
      );
    }
  };

  render() {
    return (
      <div>
        <div>{this.HandleContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    newsDetail: state.news.newsList
  };
};

export default connect(
  mapStateToProps,
  { countryNews }
)(HandleNewsDetail);
