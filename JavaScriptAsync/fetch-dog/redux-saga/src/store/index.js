import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from './reducers/reducer';
import { watcherSaga } from "./sagas/fetchDog";

export * from './reducers/actions';
export * from './reducers/selectors';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

export default store;
