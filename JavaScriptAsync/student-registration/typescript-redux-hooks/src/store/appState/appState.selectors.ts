import { AppStateSliceType } from "./appState.reducer";
import { Student } from "../students";

export const appStateSelector = (state: any): AppStateSliceType =>
  state.appState;

export const appStateIsFormVisibleSelector = (state: any): Boolean =>
  appStateSelector(state).isFormVisible;

export const appStateIsEditModeSelector = (state: any): boolean =>
  !!appStateSelector(state).studentToEdit;

export const appStateStudentToEditSelector = (state: any): Student | undefined =>
  appStateSelector(state).studentToEdit;
