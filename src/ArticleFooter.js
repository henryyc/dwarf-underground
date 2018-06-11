import React, { Component } from 'react';
import Comment from './CommentBox';
import CommentBox from './CommentBox'

class ArticleFooter extends Component {

  constructor(props) {
    super(props);

    const dontChange = <CommentBox />
    this.state = {
      visible: false,
      sessionBox: dontChange,
    };
  }

  loadFromStorageOnly() {

    const commentJSON = localStorage.getItem('userComments');
    const commentArray = JSON.parse(commentJSON);

    const oldComments = [];
    for (let i = 0; i < commentArray.length; i++) {
      oldComments.push(
        <Comment
          name={commentArray[i].name}
          date={commentArray[i].date}
          comment={commentArray[i].content}
          key={commentArray[i].hash}
        />
      );
    }

    return oldComments;
  }

  viewComments() {
    console.log(this.state.sessionBox)
    const oldComments = this.loadFromStorageOnly();
    const allComments = oldComments.concat(this.state.sessionBox.comments ? this.state.sessionBox.comments : []);
    // this.state.sessionBox.setState({
    //   comments: allComments,
    // });

    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    return (
      <div className="article-links">
        <a className="article-link">
          <i className="fa fa-comments-o"></i>
          <span className="article-link-text" onClick={() => this.viewComments()}>Comments</span>
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
