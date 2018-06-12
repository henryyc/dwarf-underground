import React, { Component } from 'react';
import CommentBox from './CommentSection'

class ArticleFooter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <div className="article-links">
        <a className="article-link">
          <i className="fa fa-comments-o"></i>
          <span className="article-link-text" onClick={
            () => {
              this.setState({
                visible: !this.state.visible,
              });
            }
            }>Comments</span>
        </a>
        <a className="article-link" href="#">
          <i className="fa fa-share"></i>
          <span className="article-link-text">Share Post</span>
        </a>
        {this.state.visible ? <CommentBox visible={true} /> : <CommentBox visible={false} />}
      </div>
    );
  }
}

export default ArticleFooter;
