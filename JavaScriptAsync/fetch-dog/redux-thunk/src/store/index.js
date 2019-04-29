import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/reducer';

export * from './reducers/actions';
export * from './reducers/selectors';
export * from './thunks/fetchDog';

const reduxStore = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

export default reduxStore;