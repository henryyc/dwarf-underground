import React, { Component } from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import ArticleFooter from './ArticleFooter';

class FrontPageArticle extends Component {
  render() {
    return (
      <div className="large-8 medium-12 columns article">

        <ArticleHeader />

        <ArticleBody />

        <ArticleFooter />

      </div>
    );
  }
}

export default FrontPageArticle;
