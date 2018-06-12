import React, { Component } from 'react';
import './App.css'

class Comment extends Component {

  render() {
    return (
      <div className="singleComment" key={this.props.key}>
        <p>Name: {this.props.name}, {this.props.relDate} ago</p>
        <p>Comment: {this.props.comment}</p>
      </div>
    )
  }
}

class CommentBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };

    this.load();
  }

  load() {
    const currComments = this.state.comments;

    const commentJSON = localStorage.getItem('userComments');
    const commentArray = JSON.parse(commentJSON);

    if (commentArray) {
      const oldComments = [];
      for (let i = 0; i < commentArray.length; i++) {
        oldComments.unshift(
          <Comment
            name={commentArray[i].name}
            date={commentArray[i].date}
            relDate={this.timeSince(new Date(commentArray[i].date))}
            comment={commentArray[i].content}
            key={commentArray[i].hash}
          />
        );
      }

      const allComments = currComments.concat(oldComments);
      if (this.refs.myRef) {
        this.state.comments = allComments;
      }
    }
  }

  save() {
    const commentData = [];

    if (this.state.comments && this.state.comments.length > 0) {
      for (let i = 0; i < this.state.comments.length; i++) {
        const temp = this.state.comments[i].props;
        commentData.unshift({
          name: temp.name,
          date: temp.date,
          relDate: temp.relDate,
          content: temp.comment,
          key: temp.key,
        });
      }

      localStorage.setItem(
        'userComments',
        JSON.stringify(commentData)
      );
    }
  }

  //gets how old a comment is/will be
  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  //java's hash function in javascript from stack overflow
  hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }

    return hash;
  }

  addComment(name, today, content) {
    const currComments = [...this.state.comments];

    currComments.unshift(
      <Comment
        name={name}
        date={today.toString()}
        relDate={this.timeSince(today)}
        comment={content}
        key={this.hashCode(name + (today + today.getMilliseconds()) + content)}
      />
    );

    this.state.comments = currComments;
    this.save();
    this.load();
    if (this.refs.myRef) {
      this.setState({
        comments: currComments,
      });
    }
  }

  handleClick = () => {
    if (this.refs.commenterName.value != "" && this.refs.commenterContent.value != "") {
      const today = new Date();
      this.addComment(this.refs.commenterName.value, today, this.refs.commenterContent.value);
    }
  };

  componentDidUpdate() {
    this.load();
  }

  componentDidMount() {
    this.load();
  }

  render() {
    return (
      <div ref="myRef">
        <h1> COMMENTS </h1>
        <input type="text" ref="commenterName" placeholder="Enter your name"></input>
        <input type="text" ref="commenterContent" placeholder="Enter your comment"></input>
        <button onClick={this.handleClick}>Add Comment</button>
        <div id="commentList">
          {this.state.comments}
        </div>
      </div>
    );
  }
}

export default CommentBox;
