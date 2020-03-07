import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import appStateReducer from './appState/appState.reducer';
import studentReducer from './students/students.reducer';

export {
  showCreateStudentFormAction,
  showEditStudentFormAction,
  hideFormAction
} from "./appState/appState.actions";

export {
  appStateIsFormVisibleSelector,
  appStateStudentToEditSelector,
  appStateIsEditModeSelector
} from './appState/appState.selectors';

export {
  resetErrorMessageAction
} from "./students/students.actions";

export {
  readAllStudentsThunk,
  addStudentThunk,
  updateStudentThunk,
  deleteStudentThunk
} from './students/thunks'

export {
  studentsIsUpdatingSelector,
  studentsUpdateErrorSelector,
  studentsAllStudentsSelector
} from './students/students.selectors';

const rootReducer = combineReducers({
  appState: appStateReducer,
  students: studentReducer
} as any);

// Call redux to create the store, and tell Redux to apply our
// middleware
const store = createStore(
  rootReducer, 
  {}, // Empty initial state.  This is set by the individual reducers.
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
