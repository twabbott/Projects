import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  DELETE_STUDENT_BEGIN,
  deleteStudentSuccessAction,
  apiFailureAction
} from "../reducers/students/actions";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* deleteStudentWatcherSaga() {
  yield takeLatest(DELETE_STUDENT_BEGIN, deleteStudentWorkerSaga);
}

const deleteStudentRequest = studentId => {
  return axios({
    method: "delete",
    url: `http://localhost:8192/api/students/${studentId}`
  });
};

// worker saga: makes the api call when watcher saga sees the action
function* deleteStudentWorkerSaga(action) {
  try {
    yield call(deleteStudentRequest, action.id);

    // dispatch a success action to the store with the new dog
    yield put(deleteStudentSuccessAction(action.id));
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(
      apiFailureAction(
        `Error deleting student id=${action.id}.  ${error.message}.`
      )
    );
  }
}
