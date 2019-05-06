import {
  READ_ALL_STUDENTS_BEGIN,
  READ_ALL_STUDENTS_SUCCESS,
  ADD_STUDENT_BEGIN,
  ADD_STUDENT_SUCCESS,
  UPDATE_STUDENT_BEGIN,
  UPDATE_STUDENT_SUCCESS,
  DELETE_STUDENT_BEGIN,
  DELETE_STUDENT_SUCCESS,
  API_FAILURE,
  RESET_ERROR
} from "./actions";

const initialState = {
  updating: false,
  error: undefined,
  students: []
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_ALL_STUDENTS_BEGIN:
    case ADD_STUDENT_BEGIN:
    case UPDATE_STUDENT_BEGIN:
    case DELETE_STUDENT_BEGIN:
      return {
        ...state,
        updating: true,
        error: undefined
      };

    case READ_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        updating: false,
        students: action.students
      };

    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        updating: false,
        students: [...state.students, action.student]
      };

    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        updating: false,
        students: state.students.map(student =>
          student.id === action.student.id ? action.student : student
        )
      };

    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        updating: false,
        students: state.students.filter(student => student.id !== action.id)
      };

    case API_FAILURE:
      return {
        ...state,
        error: action.error,
        updating: false
      };

    case RESET_ERROR:
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
