import * as actions from "./students.types";
import { ActionType, ErrorActionType } from "../util/redux-types";
import { StudentListActionType, StudentActionType, StudentIdActionType } from "./students.actions";
import { Student } from "./index";

export interface StudentSlice {
  updating: Boolean;
  error: String | undefined;
  students: Student[];
}

const initialState: StudentSlice = {
  updating: false,
  error: undefined,
  students: []
};

const studentReducer = (state: StudentSlice = initialState, action: ActionType): StudentSlice => {
  switch (action.type) {
    case actions.READ_ALL_STUDENTS_BEGIN:
    case actions.ADD_STUDENT_BEGIN:
    case actions.UPDATE_STUDENT_BEGIN:
    case actions.DELETE_STUDENT_BEGIN:
      return {
        ...state,
        updating: true,
        error: undefined
      };

    case actions.READ_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        updating: false,
        students: (action as StudentListActionType).students
      };

    case actions.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        updating: false,
        students: [...state.students, (action as StudentActionType).student]
      };

    case actions.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        updating: false,
        students: state.students.map((student: Student) =>
          student.id === (action as StudentActionType).student.id ? 
            (action as StudentActionType).student : 
            student
        )
      };

    case actions.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        updating: false,
        students: state.students.filter((student: Student) => student.id !== (action as StudentIdActionType).id)
      };

    case actions.API_FAILURE:
      return {
        ...state,
        error: (action as ErrorActionType).message,
        updating: false
      };

    case actions.RESET_ERROR:
      return {
        ...state,
        error: undefined
      };

    default:
      // No recognizable action.  Return the existing state,
      // unchanged.
      return state;
  }
};

export default studentReducer;
