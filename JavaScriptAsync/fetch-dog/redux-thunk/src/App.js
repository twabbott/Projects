import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDogLoadCompleteAction } from './store/reducers';
import { fetchDogThunkAsync } from './store/thunks';

function mapStateToProps(state) {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDogThunk: () => dispatch(fetchDogThunkAsync()),
    fetchDogLoadComplete: () => dispatch(fetchDogLoadCompleteAction())
  }
}

class App extends Component {
  onImageLoad = () => {
    this.props.fetchDogLoadComplete();
  }

  render() {
    const { fetching, dog, error, fetchDogThunk } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Fetch Dog - Redux with Redux-Thunk</h1>
          <p>
            This example demonstrates using redux with redux-thunk middleware to perform 
            an asynchronous operation.  I have two thunks, one that uses promises,
            and another that uses async/await.</p>
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
              (<button onClick={fetchDogThunk}>Fetch a dog</button>)
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