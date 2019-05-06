import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  UPDATE_STUDENT_BEGIN,
  updateStudentSuccessAction,
  apiFailureAction
} from "../reducers/students/actions";
import { hideFormAction } from '../reducers/appState/actions';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* updateStudentWatcherSaga() {
  yield takeLatest(UPDATE_STUDENT_BEGIN, updateStudentWorkerSaga);
}

const updateStudentRequest = student => {
  return axios({
    method: "put",
    url: `http://localhost:8192/api/students/${student.id}`,
    data: student
  });
};

// worker saga: makes the api call when watcher saga sees the action
function* updateStudentWorkerSaga(action) {
  try {
    const response = yield call(updateStudentRequest, action.student);

    // dispatch a success action to the store with the new dog
    yield put(updateStudentSuccessAction(response.data));
    yield put(hideFormAction());
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(
      apiFailureAction(
        `Error updating student ${action.student.firstName} ${
          action.student.lastName
        }.  ${error.message}.`
      )
    );
  }
}
