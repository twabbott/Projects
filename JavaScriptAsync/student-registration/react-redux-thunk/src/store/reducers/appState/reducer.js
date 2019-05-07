import {
  SHOW_CREATE_STUDENT_FORM,
  SHOW_EDIT_STUDENT_FORM,
  HIDE_FORM
} from "./actions";

const initialState = {
  isFormVisible: false,
  studentToEdit: undefined
};

export default function appStateReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_CREATE_STUDENT_FORM:
      return {
        ...state,
        isFormVisible: true,
        studentToEdit: undefined
      };

    case SHOW_EDIT_STUDENT_FORM:
      return {
        ...state,
        isFormVisible: true,
        studentToEdit: action.student
      };

    case HIDE_FORM:
      return {
        ...state,
        isFormVisible: false,
        studentToEdit: undefined
      };

    default:
      return state;
  }
}
