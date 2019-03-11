// Load up the React libraries.  We need both of these.
import React from 'react';
import ReactDOM from 'react-dom';

// Import all your .css files here
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

// Load all components and libraries for our app.
import App from './App';

// Tell React where to place our app on the page.
ReactDOM.render( <App />, document.getElementById('root'));






