import { createStore } from 'redux';

import rootReducer from './reducers/reducer';

export * from './reducers/actions';
export * from './reducers/selectors';

const reduxStore = createStore(
    rootReducer
);

export default reduxStore;