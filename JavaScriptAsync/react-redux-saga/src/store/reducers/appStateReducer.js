import { createAction } from 'redux-actions';

const SHOW_CREATE_STUDENT_FORM = "SHOW_CREATE_STUDENT_FORM";
const SHOW_EDIT_STUDENT_FORM = "SHOW_EDIT_STUDENT_FORM";
const HIDE_FORM = "HIDE_FORM";

const LOG_ERROR = 'LOG_ERROR';
export const logErrorAction = createAction(LOG_ERROR, (message, e) => ({ 
    message,
    data: {
        message: (e && e.message) || ""
    }
 }));


export const showCreateStudentFormAction = () => {
    return { type: SHOW_CREATE_STUDENT_FORM }
};

export const showEditStudentFormAction = (student) => {
    return { type: SHOW_EDIT_STUDENT_FORM, student }
};

export const hideFormAction = () => {
    return { type: HIDE_FORM };
}

const initialState = {
    isFormVisible: false,
    studentToEdit: undefined
}

const appStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CREATE_STUDENT_FORM:
            return {
                isFormVisible: true,
                studentToEdit: undefined
            };

        case SHOW_EDIT_STUDENT_FORM:
            return {
                isFormVisible: true,
                studentToEdit: action.student
            };

        case HIDE_FORM:
            return {
                isFormVisible: false,
                studentToEdit: undefined
            };

        default:
            return state;
    }
}

export default appStateReducer;
