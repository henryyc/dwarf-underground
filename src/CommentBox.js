import React, { Component } from 'react';
import './App.css'

class Comment extends Component {

  render() {
    return (
      <div className="singleComment" key={this.props.key}>
        <p>Name: {this.props.name}</p>
        <p>Date: {this.props.date}</p>
        <p>{this.props.comment}</p>
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

    const allComments = currComments.concat(oldComments);
    if (this.refs.myRef) {
      this.setState({
        comments: allComments,
      });
    }
  }

  save() {
    const commentData = [];
    for (let i = 0; i < this.state.comments.length; i++) {
      commentData.push({
        name: this.state.comments[i].props.name,
        date: this.state.comments[i].props.date,
        comment: this.state.comments[i].props.comment,
        key: this.state.comments[i].props.key,
      });
    }

    const allComments = commentData.concat(this.state.comments);
    localStorage.setItem(
      'userComments',
      JSON.stringify(allComments)
    );
  }

  getCurrentTime() {
    const today = new Date();
    return (today.getHours() + ":" + today.getMinutes()) + ", " + (today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate());
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

  addComment(name, date, content) {
    const currComments = [...this.state.comments];

    currComments.push(
      <Comment
        name={name}
        date={date}
        comment={content}
        key={this.hashCode(name + date + content)}
      />
    );

    this.state.comments = currComments;
    this.save();
    if (this.refs.myRef) {
      this.setState({
        comments: currComments,
      });
    }
  }

  handleClick = () => {
    this.addComment(this.refs.commenterName.value, this.getCurrentTime(), this.refs.commenterContent.value);
  };

  render() {
    return (
      <div id="modal" ref="myRef">
        <h1> COMMENTS </h1>
        <input type="text" ref="commenterName" placeholder="Enter your name"></input>
        <input type="text" ref="commenterContent" placeholder="Enter your comment"></input>
        <button onClick={this.handleClick}>Add Comment</button>
        {this.state.comments}
      </div>
    );
  }
}

export default CommentBox;
