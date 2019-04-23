import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  fetchDogAction,
  fetchDogSuccessAction,
  fetchDogErrorAction,
  fetchDogLoadCompleteAction
} from './store/reducers/';

function mapStateToProps(state) {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDog: () => dispatch(fetchDogAction()),
    fetchDogSuccess: (dog) => dispatch(fetchDogSuccessAction(dog)),
    fetchDogError: (error) => dispatch(fetchDogErrorAction(error)),
    fetchDogLoadComplete: () => dispatch(fetchDogLoadCompleteAction())
  }
}

class App extends Component {
  onRequestDogPromise = () => {
    // Tell Redux we're about to begin a fetch-cycle.
    this.props.fetchDog();

    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => this.props.fetchDogSuccess(data.message))
      .catch(err => this.props.fetchDogError(err.message));
  }

  onRequestDogAsync = async () => {
    // Tell Redux we're about to begin a fetch-cycle.
    this.props.fetchDog();

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const json = await response.json();

      // Tell Redux that we have a new image URL
      this.props.fetchDogSuccess(json.message);      
    } catch (err) {
      // Tell Redux there was a problem
      this.props.fetchDogError(err.message);
    }
  }

  onImageLoad = () => {
    this.props.fetchDogLoadComplete();
  }

  render() {
    const { fetching, dog, error } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Fetch Dog - Redux</h1>
          <p>This example demonstrates using redux without middleware to perform an asynchronous operation.</p>
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
              (<button onClick={this.onRequestDogPromise}>Fetch a dog</button>)
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