import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

async function fetchDogAsync(val) {
  console.log("parameter value=" + val);
  return await axios('https://dog.ceo/api/breeds/image/random');
}

function useAsync(callback) {
  const callbackRef = useRef();
  const [isBusy, setIsBusy] = useState(false);
  const [result, setResult] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => { 
    callbackRef.current = callback;
  }, [callback]);

  async function wrapperFunc(...args) {
    if (isBusy) {
      throw new Error("Request is in progress");
    }

    try {
      setIsBusy(true);
      setError(undefined);

      const result = await callbackRef.current(...args);

      setIsBusy(false);
      setResult(result.data.message);
    } catch (err) {
      setError(err.message);
    }
  }

  return [wrapperFunc, isBusy, result, error]; 
}

export default function App() {
  const [requestDog, fetching, dogImgUrl, error] = useAsync(fetchDogAsync);

  // function onImageLoad() {
  //   setFetching(false);
  // }

  // Make the page fetch a dog on initial load.
  useEffect(() => {
    console.log("Calling useEffect on initial mount.");
    requestDog();
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
            (<button onClick={() => requestDog("fetch!")}>Fetch a dog</button>)
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
            alt="Love that doggo!"/>
        }
      </div>
    </div>
  );
}
