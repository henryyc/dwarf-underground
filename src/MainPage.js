import React, { Component } from 'react';
import FrontPageArticle from './FrontPageArticle';
import SidebarAd from './SidebarAd';
import MoreArticles from './MoreArticles';
import './App.css';

class MainPage extends Component {
  render() {
    return (
      <main className="expanded row">

        <FrontPageArticle />

        <SidebarAd />

        <MoreArticles />

      </main>
    );
  }
}

export default MainPage;
