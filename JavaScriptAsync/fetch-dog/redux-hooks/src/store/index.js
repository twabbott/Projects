import { createStore } from 'redux';

import rootReducer from './reducer';

export * from './actions';
export * from './selectors';

const reduxStore = createStore(
    rootReducer
);

export default reduxStore;