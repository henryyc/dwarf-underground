import React, { Component } from 'react';
import ArticleHeader from './frontComps/articleHeader/ArticleHeader';
import ArticleBody from './frontComps/articleBody/ArticleBody';
import ArticleFooter from './frontComps/articleFooter/ArticleFooter';

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
