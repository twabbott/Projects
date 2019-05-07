import React, { Component } from 'react';

export default class App extends Component {
  state = {
    fetching: false,
    dog: undefined,
    error: undefined
  }

  onRequestDog = () => {
    this.setState({
      fetching: true,
      error: undefined
    });

    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => 
        this.setState({
          dog: data.message
       })
      )
      .catch(err => 
        this.setState({
          error: err.message
        })
      );
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
        <header>
          <h1>Fetch Dog</h1>
          <p>This example demonstrates using promises to perform an asynchronous operation.</p>
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
