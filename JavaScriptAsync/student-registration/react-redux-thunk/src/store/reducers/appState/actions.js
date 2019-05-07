export const SHOW_CREATE_STUDENT_FORM = "SHOW_CREATE_STUDENT_FORM";
export const SHOW_EDIT_STUDENT_FORM = "SHOW_EDIT_STUDENT_FORM";
export const HIDE_FORM = "HIDE_FORM";

export function showCreateStudentFormAction() {
  return { 
    type: SHOW_CREATE_STUDENT_FORM,
    student: undefined
  };
};

export function showEditStudentFormAction(student) {
  return { 
    type: SHOW_EDIT_STUDENT_FORM, 
    student 
  };
};

export function hideFormAction() {
  return { 
    type: HIDE_FORM 
  };
};

const action = showCreateStudentFormAction();
console.log(action);