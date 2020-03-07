import * as actions from './appState.types';
import { Student } from '../students';
import { ActionType } from '../util/redux-types';
import { StudentActionType } from '../students/students.actions';

export interface AppStateSliceType {
  isFormVisible: Boolean;
  studentToEdit: Student | undefined;
}

const initialState: AppStateSliceType = {
  isFormVisible: false,
  studentToEdit: undefined
};

export default function appStateReducer(state: AppStateSliceType = initialState, action: ActionType) {
  switch (action.type) {
    case actions.SHOW_CREATE_STUDENT_FORM:
      return {
        ...state,
        isFormVisible: true,
        studentToEdit: undefined
      };

    case actions.SHOW_EDIT_STUDENT_FORM:
      return {
        ...state,
        isFormVisible: true,
        studentToEdit: (action as StudentActionType).student
      };

    case actions.HIDE_FORM:
      return {
        ...state,
        isFormVisible: false,
        studentToEdit: undefined
      };

    default:
      return state;
  }
}
