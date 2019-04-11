import React from 'react';

import InfiniteScroll from 'react-infinite-scroller';
import User from './User';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import Footer from './Footer';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

class App extends React.Component {
  state = {
    items: [],
    hasMore: true,
    error: undefined
  };

  nextItemKey = 1000;

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateHobbies = () => {
    const hobbies = [
      'Rock climbing',
      'Travel',
      'Computer Programming',
      'Comics',
      'Movies',
      'Dogs',
      'Hiking',
      'Scuba',
      'Cooking',
      'Writing',
      'Painting',
      'Woodworking',
      'Needlepoint',
      'Knitting',
      'Crochet',
      'Horses',
      'Electronics',
      'Model trains',
      'Model airplaines'
    ];

    let idx = Math.floor(Math.random() * hobbies.length);
    const count = Math.floor(Math.random() * 5) + 1;
    const STEP = 11;

    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(hobbies[idx]);
      idx = (idx + STEP) % hobbies.length;
    }

    return list;
  }

  onLoadItems = async () => {
    console.log("Fetching stuff, starting at idx=" + this.nextItemKey);

    let newItems = undefined;
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      await this.sleep(2000);

      // Creates a transformed array of user data
      newItems = json.results.map(user => ({
          key: this.nextItemKey++,
          email: user.email,
          name: Object.values(user.name).join(' '),
          photo: user.picture.medium,
          username: user.login.username,
          uuid: user.login.uuid,
          hobbies: this.generateHobbies()
        })
      );
    } catch (err) {
      this.setState({
        hasMore: false,
        error: "Error fetching users: " + err.message
      });

      // We're done.  :(
      return;
    }

    const newList = [
      ...this.state.items,
      ...newItems
    ];
    this.setState({
      items: newList,
      hasMore: newList.length < 50
    });    
  }

  render() {
    const items = this.state.items.map(user => <User key={user.email} user={user} />);
    const style = {
      overflow: 'auto',
      border: '1px solid black',
      marginBottom: '30px'
    };

    return (
      <>
        <h1>Infinite Users!</h1>
        <p>Scroll down to load more!!</p>
        <div style={style}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.onLoadItems}
            hasMore={this.state.hasMore}
            loader={<Loader />}
            useWindow={false}
          >
            {items}
          </InfiniteScroll>
        </div>
        {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
        {!this.state.hasMore && !this.state.error && <div>That's as far as it goes!</div>}
        <Footer>
          Brought to you by Tom Abbott
        </Footer>
      </>
    );
  }
}

export default App;
/*
  render() {
    const items = this.state.items.map(user => <User key={user.email} user={user} />);

    return (
      <>
        <h1>Infinite Users!</h1>
        <p>Scroll down to load more!!</p>
        <div style={style}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.onLoadItems}
            hasMore={this.state.hasMore}
            loader={<Loader />}
          >
            {items}
          </InfiniteScroll>
          {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
          {!this.state.hasMore && !this.state.error && <div>That's as far as it goes!</div>}
        </div>
        <footer>
          Brought to you by Tom Abbott
        </footer>
      </>
    );
  }


*/