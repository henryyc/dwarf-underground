import React, { Component } from 'react';
import Header from './appComps/header/Header';
import MainPage from './appComps/main/MainPage'
import Footer from './appComps/footer/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <MainPage />

        <Footer />
      </div>
    );
  }
}

export default App;
