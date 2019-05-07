export const READ_ALL_STUDENTS_BEGIN = "READ_ALL_STUDENTS_BEGIN";
export const READ_ALL_STUDENTS_SUCCESS = "READ_ALL_STUDENTS_SUCCESS";
export const ADD_STUDENT_BEGIN = "ADD_STUDENT_BEGIN";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const UPDATE_STUDENT_BEGIN = "UPDATE_STUDENT_BEGIN";
export const UPDATE_STUDENT_SUCCESS = "UPDATE_STUDENT_SUCCESS";
export const DELETE_STUDENT_BEGIN = "DELETE_STUDENT_BEGIN";
export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";
export const API_FAILURE = "API_FAILURE";
export const RESET_ERROR = "RESET_ERROR";

export const readAllStudentsBeginAction = () => 
    ({ type: READ_ALL_STUDENTS_BEGIN });

export const readAllStudentsSuccessAction = students => 
    ({ type: READ_ALL_STUDENTS_SUCCESS, students });

export const addStudentBeginAction = (student) => 
    ({ type: ADD_STUDENT_BEGIN, student });

export const addStudentSuccessAction = (student) => 
    ({ type: ADD_STUDENT_SUCCESS, student });

export const updateStudentBeginAction = (student) => 
    ({ type: UPDATE_STUDENT_BEGIN, student });

export const updateStudentSuccessAction = (student) => 
    ({ type: UPDATE_STUDENT_SUCCESS, student });

export const deleteStudentBeginAction = id => 
    ({ type: DELETE_STUDENT_BEGIN, id });

export const deleteStudentSuccessAction = id => 
    ({ type: DELETE_STUDENT_SUCCESS, id });

export const apiFailureAction = error => 
    ({ type: API_FAILURE, error });

export const resetErrorMessageAction = () =>
    ({ type: RESET_ERROR });
