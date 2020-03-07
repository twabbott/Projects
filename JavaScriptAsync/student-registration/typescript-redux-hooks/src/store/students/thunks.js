import axios from 'axios';

import {
  readAllStudentsBeginAction,
  readAllStudentsSuccessAction,
  addStudentBeginAction,
  addStudentSuccessAction,
  updateStudentBeginAction,
  updateStudentSuccessAction,
  deleteStudentBeginAction,
  deleteStudentSuccessAction,
  apiFailureAction
} from './students.actions';
import { hideFormAction } from '../appState/appState.actions';

export const readAllStudentsThunk = () => async dispatch => {
  try {
    dispatch(readAllStudentsBeginAction());

    const { data } = await axios({
      method: "get",
      url: "http://localhost:8192/api/students"
    });

    dispatch(readAllStudentsSuccessAction(data));
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}

export const addStudentThunk = student => async dispatch => {
  dispatch(addStudentBeginAction());

  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:8192/api/students",
      data: student
    });

    dispatch(addStudentSuccessAction(data));
    dispatch(hideFormAction());
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}

export const updateStudentThunk = student => async dispatch => {
  dispatch(updateStudentBeginAction());

  try {
    const { data } = await axios({
      method: "put",
      url: `http://localhost:8192/api/students/${student.id}`,
      data: student
    });

    dispatch(updateStudentSuccessAction(data));
    dispatch(hideFormAction());
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}

export const deleteStudentThunk = id => async dispatch => {
  dispatch(deleteStudentBeginAction(id));

  try {
    await axios({
      method: "delete",
      url: `http://localhost:8192/api/students/${id}`
    });

    dispatch(deleteStudentSuccessAction(id));
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}
