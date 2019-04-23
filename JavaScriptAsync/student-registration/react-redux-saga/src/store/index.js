import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// Step 1: import our root reducer and our root saga
import rootReducer from "./reducers";
import rootSaga from "./sagas";

export { showCreateStudentFormAction, showEditStudentFormAction, hideFormAction } from "./reducers/appStateReducer";
export { readAllStudentsBeginAction, addStudentBeginAction, updateStudentBeginAction, deleteStudentBeginAction, resetErrorMessageAction } from "./reducers/studentReducer";

// Step 2: call the createSagaMiddleware factory function, and get an 
//         instance of the saga middleware.
const sagaMiddleware = createSagaMiddleware();

// Step 3: Call redux to create the store, and tell Redux to apply our 
//         middleware
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware));

// Step 4: run our middleware
sagaMiddleware.run(rootSaga);

export default store;
