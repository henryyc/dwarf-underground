import React, { Component } from 'react';
import Clickbait from './Clickbait';

class MoreArticles extends Component {
  render() {
    return (
      <div className="small-12 columns other-articles">
        <h2>From around the Realm</h2>
        <Clickbait imgSrc="https://www.enclavepublishing.com/wp-content/uploads/2015/11/tumblr_inline_mtvwr6T4qH1r8eb4v.gif" alt="orc" imgCaption="Single Orcs in Indianapolis"/>
        <Clickbait imgSrc="https://images.fineartamerica.com/images-medium-large-5/rocky-mountain-landscape-meadow-in-spring-western-panorama-with-wildflowers-square-format-walt-curlee.jpg" alt="mountain" imgCaption="You won't believe what's under this mountain"/>
        <Clickbait imgSrc="http://orig01.deviantart.net/a278/f/2010/357/9/7/seamless___gold_coins_by_bartalon-d35iydr.jpg" alt="gold" imgCaption="Mine 20% more gold with One Weird Trick"/>
        <Clickbait imgSrc="http://cdn23.us1.fansshare.com/photos/thehobbit/the-hobbit-square-characters-833282558.jpg" alt="hobbit" imgCaption="Surprise for Indiana Hobbits born before 1999"/>
      </div>
    );
  }
}

export default MoreArticles;
