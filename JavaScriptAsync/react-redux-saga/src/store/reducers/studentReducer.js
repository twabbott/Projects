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

const initialState = {
    updating: false,
    error: undefined,
    students: [
        // {
        //     id: 100,
        //     firstName: "Denzel", 
        //     lastName: "Washington", 
        //     male: true, 
        //     uvuId: 11223344, 
        //     race: "black", 
        //     age: 23, 
        //     isVeteran: true
        // },
    ]
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
                students: [
                    ...state.students, 
                    action.student,
                ]
            };

        case UPDATE_STUDENT_SUCCESS:
            return {
                ...state,
                updating: false,
                students: state.students.map(student => 
                    (student.id === action.student.id) ? action.student : student )
            }

        case DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                updating: false,
                students: state.students.filter(student => 
					student.id !== action.id)
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
