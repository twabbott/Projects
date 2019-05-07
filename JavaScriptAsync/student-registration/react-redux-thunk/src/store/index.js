import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import rootReducer from "./reducers";

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
  resetErrorMessageAction
} from "./reducers/students/actions";

export {
  readAllStudentsThunk,
  addStudentThunk,
  updateStudentThunk,
  deleteStudentThunk
} from './reducers/students/thunks'

export {
  studentsIsUpdatingSelector,
  studentsUpdateErrorSelector,
  studentsAllStudentsSelector
} from './reducers/students/selectors';

// Call redux to create the store, and tell Redux to apply our
// middleware
const store = createStore(
  rootReducer, 
  {}, // Empty initial state.  This is set by the individual reducers.
  applyMiddleware(thunk));

export default store;
