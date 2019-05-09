export function appStateSelector(state) {
  return state.appState;
}

export function appStateIsFormVisibleSelector(state) {
  return appStateSelector(state).isFormVisible;
}

export function appStateIsEditModeSelector(state) {
  return !!appStateSelector(state).studentToEdit;
}

export function appStateStudentToEditSelector(state) {
  return appStateSelector(state).studentToEdit;
}
