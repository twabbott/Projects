import { ActionType, ErrorActionType } from '../util/redux-types';

import * as actions from './students.types';
import { Student } from './index';

export interface StudentIdActionType extends ActionType {
    id: Number;
};

export interface StudentActionType extends ActionType {
    student: Student;
};

export interface StudentListActionType extends ActionType {
    students: Student[];
};

export const readAllStudentsBeginAction = (): ActionType => 
    ({ type: actions.READ_ALL_STUDENTS_BEGIN });

export const readAllStudentsSuccessAction = (students: Student[]): StudentListActionType => 
    ({ type: actions.READ_ALL_STUDENTS_SUCCESS, students });

export const addStudentBeginAction = (student: Student): StudentActionType => 
    ({ type: actions.ADD_STUDENT_BEGIN, student });

export const addStudentSuccessAction = (student: Student): StudentActionType => 
    ({ type: actions.ADD_STUDENT_SUCCESS, student });

export const updateStudentBeginAction = (student: Student): StudentActionType => 
    ({ type: actions.UPDATE_STUDENT_BEGIN, student });

export const updateStudentSuccessAction = (student: Student): StudentActionType => 
    ({ type: actions.UPDATE_STUDENT_SUCCESS, student });

export const deleteStudentBeginAction = (id: Number): StudentIdActionType => 
    ({ type: actions.DELETE_STUDENT_BEGIN, id });

export const deleteStudentSuccessAction = (id: Number): StudentIdActionType => 
    ({ type: actions.DELETE_STUDENT_SUCCESS, id });

export const apiFailureAction = (message: String): ErrorActionType => 
    ({ type: actions.API_FAILURE, message });

export const resetErrorMessageAction = (): ActionType =>
    ({ type: actions.RESET_ERROR });
