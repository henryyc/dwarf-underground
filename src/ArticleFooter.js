import React, { Component } from 'react';
import CommentBox from './CommentSection'

class ArticleFooter extends Component {

  constructor(props) {
    super(props);

    const dontChange = <CommentBox />
    this.state = {
      visible: false,
      sessionBox: dontChange,
    };
  }

  viewComments = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <div className="article-links">
        <a className="article-link">
          <i className="fa fa-comments-o"></i>
          <span className="article-link-text" onClick={this.viewComments}>Comments</span>
        </a>
        <a className="article-link" href="#">
          <i className="fa fa-share"></i>
          <span className="article-link-text">Share Post</span>
        </a>
        {this.state.visible ? this.state.sessionBox : null}
      </div>
    );
  }
}

export default ArticleFooter;
