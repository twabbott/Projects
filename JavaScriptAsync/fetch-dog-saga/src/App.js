import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { fetchDogAction } from "./store/reducers";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const { fetching, dog, error, onRequestDog } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {
            dog ? 
              (<p className="App-intro">Keep clicking for new dogs!</p>) :
              (<p className="App-intro">Click the button to fetch a dog.</p>)
          }
        </div>
        <div>
          {
            fetching ?
              (<button disabled>Fetching...</button>) :
              (<button onClick={onRequestDog}>Fetch a dog</button>)
          }
        </div>
        <div>
          {
            error && <p style={{ color: "red" }}>WTH? There was a bad! {error}</p>
          }
        </div>
        <div>
          <img src={dog || logo} alt="Love that doggo!" />
        </div>
      </div>
    );
  }
}

const mapStateToProps= state => {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch(fetchDogAction())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
