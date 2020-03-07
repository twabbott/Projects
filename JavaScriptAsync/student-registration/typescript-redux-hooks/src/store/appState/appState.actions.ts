import * as actions from "./appState.types";
import { Student } from "../students";
import { ActionType } from "../util/redux-types";

export interface NewStudentActionType extends ActionType {
  student: Student | undefined;
}

export const showCreateStudentFormAction = (): NewStudentActionType => ({ 
  type: actions.SHOW_CREATE_STUDENT_FORM,
  student: undefined
});

export const showEditStudentFormAction = (student: Student) => ({
  type: actions.SHOW_EDIT_STUDENT_FORM, 
  student 
});

export const hideFormAction = (): ActionType => ({
  type: actions.HIDE_FORM 
});
