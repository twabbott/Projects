import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

export {
  showCreateStudentFormAction,
  showEditStudentFormAction,
  hideFormAction
} from "./reducers/appState/actions";

export {
  appStateIsFormVisibleSelector,
  appStateStudentToEditSelector,
  appStateIsEditModeSelector
} from './reducers/appState/selectors';

export {
  readAllStudentsBeginAction,
  addStudentBeginAction,
  updateStudentBeginAction,
  deleteStudentBeginAction,
  resetErrorMessageAction
} from "./reducers/students/actions";

export {
  studentsIsUpdatingSelector,
  studentsUpdateErrorSelector,
  studentsAllStudentsSelector
} from './reducers/students/selectors';

// Step 1: call the createSagaMiddleware factory function, and get an
//         instance of the saga middleware.
const sagaMiddleware = createSagaMiddleware();

// Step 2: Call redux to create the store, and tell Redux to apply our
//         middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Step 3: run our middleware
sagaMiddleware.run(rootSaga);

export default store;
