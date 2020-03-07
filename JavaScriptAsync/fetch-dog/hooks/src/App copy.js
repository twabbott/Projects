import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [fetching, setFetching] = useState(false);
  const [dogImgUrl, setDogImgUrl] = useState(undefined);
  const [error, setError] = useState(undefined);

  async function onRequestDog() {
    try {
      setFetching(true);
      setError(undefined);

      const result = await axios('https://dog.ceo/api/breeds/image/random');

      setDogImgUrl(result.data.message);
    } catch (err) {
      setError(err.message);
    }
  }  

  function onImageLoad() {
    setFetching(false);
  }

  // Make the page fetch a dog on initial load.
  useEffect(() => {
    console.log("Calling useEffect on initial mount.");
    onRequestDog();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Fetch Dog</h1>
        <p>This example demonstrates using promises to perform an asynchronous operation.</p>
      </header>
      <div>
        { fetching && "Fetching a dog..."}
        { !fetching && dogImgUrl && "Keep clicking for new dogs!" }
        { !fetching && !dogImgUrl && "Click the button to fetch a dog." }
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
        { dogImgUrl &&
          <img 
            src={dogImgUrl}
            alt="Love that doggo!" 
            onLoad={onImageLoad}/>
        }
      </div>
    </div>
  );
}
