import React from 'react';
import { useSelector, useActions } from 'react-redux';
import { 
  fetchDogAction,
  fetchDogSuccessAction,
  fetchDogErrorAction,
  fetchDogLoadCompleteAction,
  isFetchingSelector,
  dogUrlSelector,
  errorMessageSelector
} from './store';

export default function App(props) {
  // Selectors read from the store
  const fetching = useSelector(isFetchingSelector);
  const dog = useSelector(dogUrlSelector);
  const error = useSelector(errorMessageSelector);

  // Actions create/update/delete to the store
  const fetchDog = useActions(fetchDogAction);
  const fetchDogSuccess = useActions(fetchDogSuccessAction);
  const fetchDogError = useActions(fetchDogErrorAction);
  const fetchDogLoadComplete = useActions(fetchDogLoadCompleteAction);

  const onRequestDogPromise = () => {
    // Tell Redux we're about to begin a fetch-cycle.
    fetchDog();

    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => fetchDogSuccess(data.message))
      .catch(err => fetchDogError(err.message));
  }

  const onRequestDogAsync = async () => {
    // Tell Redux we're about to begin a fetch-cycle.
    fetchDog();

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const json = await response.json();

      // Tell Redux that we have a new image URL
      fetchDogSuccess(json.message);      
    } catch (err) {
      // Tell Redux there was a problem
      fetchDogError(err.message);
    }
  }

  const onImageLoad = () => {
    fetchDogLoadComplete();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fetch Dog - Redux</h1>
        <p>This example demonstrates using redux and React hooks react-redux, without middleware to perform an asynchronous operation.</p>
        <p>Resources for further reading:</p>
        <ul>
          <li>Documentation on using hooks from React Redux's <a href="https://react-redux.js.org/next/api/hooks#hooks">homepage</a>.</li>
          <li>Helpful <a href="https://www.youtube.com/watch?time_continue=443&v=_oK9Jd8LH1E">video</a> on this topic.</li>
        </ul>
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
            (<button onClick={onRequestDogPromise}>Fetch a dog</button>)
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
            onLoad={onImageLoad}/>
        }
      </div>
    </div>
  );
}
