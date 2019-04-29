import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  isFetchingSelector,
  dogUrlSelector,
  errorMessageSelector,
  fetchDogAction,
  fetchDogLoadCompleteAction 
} from './store';

function mapStateToProps(state) {
  return {
    fetching: isFetchingSelector(state),
    dog: dogUrlSelector(state),
    error: errorMessageSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDog: () => dispatch(fetchDogAction()),
    fetchDogLoadComplete: () => dispatch(fetchDogLoadCompleteAction())
  }
}

class App extends Component {
  onImageLoad = () => {
    this.props.fetchDogLoadComplete();
  }

  render() {
    const { fetching, dog, error, fetchDog } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Fetch Dog - Redux with Redux-Saga</h1>
          <p>
            This example demonstrates using redux-saga middleware to perform 
            an asynchronous operation.</p>
        </header>
        <div>
          { fetching && "Fetching a dog..."}
          { !fetching && dog && "Keep clicking for new dogs!" }
          { !fetching && !dog && "Click the button to fetch a dog." }
        </div>
        <div>
          {
            fetching ?
              (<button disabled>Fetching...</button>) :
              (<button onClick={fetchDog}>Fetch a dog</button>)
          }
        </div>
        <div>
          {
            error && <p style={{ color: "red" }}>WTH? There was a bad! {error}</p>
          }
        </div>
        <div>
          { dog &&
            <img 
              src={dog}
              alt="Love that doggo!" 
              onLoad={this.onImageLoad}/>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);