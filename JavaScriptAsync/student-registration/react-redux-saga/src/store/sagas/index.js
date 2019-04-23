import { all, call } from "redux-saga/effects";

import readAllStudentsWatcherSaga from "./readStudents.saga";
import addStudentWatcherSaga from "./addStudent.saga";
import updateStudentWatcherSaga from "./updateStudent.saga";
import deleteStudentWatcherSaga from "./deleteStudent.saga";

export default function* rootSaga() {
    yield all([
        call(readAllStudentsWatcherSaga),
        call(addStudentWatcherSaga),
        call(updateStudentWatcherSaga),
        call(deleteStudentWatcherSaga)
    ]);
}
