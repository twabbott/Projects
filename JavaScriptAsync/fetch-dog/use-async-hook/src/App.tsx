import React, { useEffect } from 'react';
import useAsync from './use-async';

async function fetchDogAsync(str: string): Promise<string> {
  console.log(str);
  const response: Response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data: any = await response.json();
  return data.message;
}

export default function App() {
  const fetchOperation = useAsync<string>(fetchDogAsync);

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
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Fetch Dog</h1>
        <p>This example demonstrates using promises to perform an asynchronous operation.</p>
      </header>
      <div>
        { fetchOperation.isBusy && "Fetching a dog..."}
        { !fetchOperation.isBusy && fetchOperation.result && "Keep clicking for new dogs!" }
        { !fetchOperation.isBusy && !fetchOperation.result && "Click the button to fetch a dog." }
      </div>
      <div>
        {
          fetchOperation.isBusy ?
            (<button disabled>Fetching...</button>) :
            (<button onClick={() => fetchOperation.invoke('fetch from button click')}>Fetch a dog</button>)
        }
      </div>
      <div>
        {
          fetchOperation.error && <p style={{ color: "red" }}>WTH? There was a bad! {fetchOperation.error.message}</p>
        }
      </div>
      <div>
        { fetchOperation.result &&
          <img 
            src={fetchOperation.result}
            alt="Love that doggo!"/>
        }
      </div>
    </div>
  );
}
