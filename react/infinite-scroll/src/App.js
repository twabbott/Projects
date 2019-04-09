import React from 'react';

import InfiniteScroll from './InfiniteScroll';
import User from './User';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

class App extends React.Component {
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
      // <InfiniteScroll> will catch an error and pass it to the error 
      // render-prop
      throw new Error("Error fetching users: " + err.message);
    }

    // On success, return an array of new items.
    return newItems;
  }

  render() {
    return (
      <>
        <h1>Infinite Users!</h1>
        <p>Scroll down to load more!!</p>
        <InfiniteScroll
          loading={<Loader />}
          renderItem={user => <User key={user.email} user={user} />}
          endOfList={<div>You did it! You reached the end!</div>}
          error={ message => <ErrorMessage>{message}</ErrorMessage> }
          onLoadItems={this.onLoadItems}
        />
      </>
    );
  }
}

export default App;
