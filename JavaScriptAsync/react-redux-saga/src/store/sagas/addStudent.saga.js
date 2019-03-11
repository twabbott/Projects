import { takeLatest, call, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import axios from "axios";

import { ADD_STUDENT_BEGIN, addStudentSuccessAction, apiFailureAction } from "../reducers/studentReducer";
import { hideFormAction } from "../reducers/appStateReducer";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* addStudentWatcherSaga() {
    yield takeLatest(ADD_STUDENT_BEGIN, addStudentWorkerSaga);
}

const addStudentRequest = (student) => {
    return axios({
        method: "post",
        url: "http://localhost:8192/api/students",
        data: student
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* addStudentWorkerSaga(action) {
    try {
        yield call(delay, 3000);
        const response = yield call(addStudentRequest, action.student);

        // dispatch a success action to the store with the new dog
        yield put(addStudentSuccessAction(response.data));
        yield put(hideFormAction());
    } 
    catch (error) {
        // dispatch a failure action to the store with the error
        yield put(apiFailureAction(`Error adding student ${action.student.firstName} ${action.student.lastName}.  ${error.message}.`));
    }
}
