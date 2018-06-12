import React, { Component } from 'react';
import FrontPageArticle from './mainComps/front/FrontPageArticle';
import SidebarAd from './mainComps/side/SidebarAd';
import MoreArticles from './mainComps/more/MoreArticles';
import './../../App.css';

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
