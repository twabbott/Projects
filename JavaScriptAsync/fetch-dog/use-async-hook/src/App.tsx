import React, { useEffect } from 'react';
import useAsync from './use-async';

async function fetchDogAsync(str: string): Promise<string> {
  console.log(str);
  const response: Response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data: any = await response.json();
  return data.message;
}

export default function App() {
  const fetchOperation = useAsync(fetchDogAsync);
  const {
    result,
    isBusy,
    error,
  } = fetchOperation;

  // Make the page fetch a dog on initial load.
  useEffect(() => {
    fetchOperation.invoke('fetch from initial mount')
      .then(data => {
        if (fetchOperation.error) {
          console.log('Fetch operation error:', fetchOperation.error);
        } else {
          console.log('Fetch operation success:', data);
        }
      });
  }, [fetchOperation]);

  return (
    <div className="App">
      <header>
        <h1>Fetch Dog</h1>
        <p>This example demonstrates using promises to perform an asynchronous operation.</p>
      </header>
      <div>
        { isBusy && "Fetching a dog..."}
        { !isBusy && result && "Keep clicking for new dogs!" }
        { !isBusy && !result && "Click the button to fetch a dog." }
      </div>
      <div>
        {
          isBusy ?
            (<button disabled>Fetching...</button>) :
            (<button onClick={() => fetchOperation.invoke('fetch from button click')}>Fetch a dog</button>)
        }
      </div>
      <div>
        {
          error && <p style={{ color: "red" }}>WTH? There was a bad! {error.message}</p>
        }
      </div>
      <div>
        { result &&
          <img 
            src={result}
            alt="Love that doggo!"/>
        }
      </div>
    </div>
  );
}
