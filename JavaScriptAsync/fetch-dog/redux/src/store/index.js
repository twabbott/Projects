import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const reduxStore = createStore(
    rootReducer
);

export default reduxStore;