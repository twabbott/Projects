import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CounterProvider } from './CounterContext';


ReactDOM.render(
  <React.StrictMode>
    <CounterProvider>
      <App />
    </CounterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
