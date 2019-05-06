export function studentsSelector(state) {
  return state.students;
}

export function studentsIsUpdatingSelector(state) {
  return studentsSelector(state).updating;
}

export function studentsUpdateErrorSelector(state) {
  return studentsSelector(state).error;
}

export function studentsAllStudentsSelector(state) {
  return studentsSelector(state).students;
}