import React, { Component } from 'react';

export default class App extends Component {
  state = {
    fetching: false,
    dog: undefined,
    error: undefined
  }

  onRequestDog = async () => {
    this.setState({
      fetching: true,
      error: undefined
    });

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const json = await response.json();

      this.setState({
        dog: json.message
      });      
    } catch (err) {
      this.setState({
        error: err.message
      });
    }
  }

  onImageLoad = () => {
    this.setState({
      fetching: false
    });
  }

  render() {
    const { fetching, dog, error } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Async example</h1>
          <p>This example demonstrates using async/await and fetch() to load an image of a dog.</p>
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
              (<button onClick={this.onRequestDog}>Fetch a dog</button>)
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
