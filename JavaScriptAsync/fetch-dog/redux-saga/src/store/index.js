import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import { watcherSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

export default store;