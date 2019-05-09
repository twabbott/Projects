import { createStore, applyMiddleware } from "redux";
import middleware from './middleware';

import rootReducer from "./reducers";

import { addListener } from "./middleware";

import { 
  READ_ALL_STUDENTS_BEGIN, 
  ADD_STUDENT_BEGIN,
  UPDATE_STUDENT_BEGIN,
  DELETE_STUDENT_BEGIN
} from './reducers/students/actions'

import {
  readAllStudentsWorker,
  addStudentWorker,
  updateStudentWorker,
  deleteStudentWorker
} from './middleware/workers';

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


addListener(READ_ALL_STUDENTS_BEGIN, readAllStudentsWorker);
addListener(ADD_STUDENT_BEGIN, addStudentWorker);
addListener(UPDATE_STUDENT_BEGIN, updateStudentWorker);
addListener(DELETE_STUDENT_BEGIN, deleteStudentWorker);

// Call redux to create the store, and tell Redux to apply our
// middleware
const store = createStore(
  rootReducer, 
  {}, // Empty initial state.  This is set by the individual reducers.
  applyMiddleware(middleware));

export default store;
