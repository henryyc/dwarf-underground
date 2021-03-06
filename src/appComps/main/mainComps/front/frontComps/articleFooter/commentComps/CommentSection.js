import React, { Component } from 'react';
import './../../../../../../../App.css'

class Comment extends Component {

  render() {
    return (
      <div className="singleComment" key={this.props.key}>
        <p className="commentLabels">Name: {this.props.name}, {this.props.relDate} ago</p>
        <p className="commentLabels">Comment: {this.props.comment}</p>
      </div>
    )
  }
}

class CommentBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      updated: false,
    };

    this.load();
  }

  //search array using component's hash value
  customIndexOf(arr, value) {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].props.hash === value.props.hash) {
        index = i;
        i = arr.length;
      }
    }
    return index;
  }

  //load in comments from local storage
  load() {
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

      //union comments from localstorage with currently loaded comments
      const allComments = oldComments.slice(0);
      for (let i = 0; i < allComments; i++) {
        if (this.customIndexOf(allComments, this.state.comments[i]) == -1) {
          allComments.unshift(this.state.comments[i])
        }
      }

      if (this.refs.myRef) {
        this.state.comments = allComments;
      }
    }
  }

  //store current comments in local storage
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

  //add new comment to state
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

  //load whenever needed
  componentDidMount() {
    this.save();
    this.load();
  }
  componentDidUpdate() {
    this.save();
    this.load();

    //toggle update permissions to prevent stack overflow
    if (!this.state.updated) {
      this.setState({
        updated: !this.state.updated,
      });
    }
  }

  render() {
    return this.props.visible ? (
      <div ref="myRef" className="sessionBox">
        <br />
        <h1> COMMENTS </h1>
        <input type="text" ref="commenterName" placeholder="Enter your name"></input>
        <textarea type="text" ref="commenterContent" className="textBox" placeholder="Enter your comment"></textarea>

        <div className="article-links">
          <a className="article-link">
            <i className="fa fa-plus"></i>
            <span className="article-link-text" onClick={
              //add new comment if fields are not empty
              () => {
                const tempName = this.refs.commenterName.value;
                const tempContent = this.refs.commenterContent.value;

                if (tempName != "" && tempContent != "") {

                  //manually reset fields
                  this.refs.commenterName.value = "";
                  this.refs.commenterContent.value = "";
                  this.addComment(tempName, new Date(), tempContent);
                }
                else {
                  alert('Please fill in all fields!');
                }
              }
            }>Add Comment</span>
          </a>
        </div>

        <div id="commentList">
          <br />
          {this.state.comments}
        </div>
      </div>
    ) : null;
  }
}

export default CommentBox;
