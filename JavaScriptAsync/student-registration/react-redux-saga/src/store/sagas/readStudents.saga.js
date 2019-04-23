import { takeLatest, call, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import axios from "axios";

import { READ_ALL_STUDENTS_BEGIN, readAllStudentsSuccessAction, apiFailureAction } from "../reducers/studentReducer";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* readAllStudentsWatcherSaga() {
    console.log("readAllStudentsWatcherSaga: begin");

    yield takeLatest(READ_ALL_STUDENTS_BEGIN, readAllStudentsWorkerSaga);

    console.log("readAllStudentsWatcherSaga: completed");
}

const readAllStudentsRequest = () => {
    return axios({
        method: "get",
        url: "http://localhost:8192/api/students"
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* readAllStudentsWorkerSaga() {
    console.log("readAllStudentsWorkerSaga: begin");

    try {
        // yield call(delay, 3000);
        const response = yield call(readAllStudentsRequest);

        // dispatch a success action to the store with the new dog
        yield put(readAllStudentsSuccessAction(response.data));

        console.log("readAllStudentsWorkerSaga: completed");
    } 
    catch (error) {
        // dispatch a failure action to the store with the error
        yield put(apiFailureAction(`Error fetching student list from server.  ${error.message}.`));

        console.log("readAllStudentsWorkerSaga: error");
    }
}
