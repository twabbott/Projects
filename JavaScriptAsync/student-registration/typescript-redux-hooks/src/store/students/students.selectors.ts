import { StudentSlice } from "./students.reducer";
import { Student } from "./index";

export const studentsSelector = (state: any): StudentSlice => 
  state.students as StudentSlice;

export const studentsIsUpdatingSelector = (state: any): Boolean => 
  studentsSelector(state).updating;

export const studentsUpdateErrorSelector = (state: any): String | undefined =>
  studentsSelector(state).error;

export const studentsAllStudentsSelector = (state: any): Student[] => 
  studentsSelector(state).students;
