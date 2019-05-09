import axios from 'axios';

import {
  readAllStudentsSuccessAction,
  addStudentSuccessAction,
  updateStudentSuccessAction,
  deleteStudentSuccessAction,
  apiFailureAction
} from '../reducers/students/actions';

import { hideFormAction } from '../reducers/appState/actions';

export async function readAllStudentsWorker({ dispatch }) {  
  try {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:8192/api/students"
    });

    dispatch(readAllStudentsSuccessAction(data));
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}

export async function addStudentWorker({ action, dispatch }) {
  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:8192/api/students",
      data: action.student
    });

    dispatch(addStudentSuccessAction(data));
    dispatch(hideFormAction());
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}

export async function updateStudentWorker({ action, dispatch }) {
  try {
    const { data } = await axios({
      method: "put",
      url: `http://localhost:8192/api/students/${action.student.id}`,
      data: action.student
    });

    dispatch(updateStudentSuccessAction(data));
    dispatch(hideFormAction());
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}

export async function deleteStudentWorker({ action, dispatch }) {
  try {
    await axios({
      method: "delete",
      url: `http://localhost:8192/api/students/${action.id}`
    });

    dispatch(deleteStudentSuccessAction(action.id));
  } catch (err) {
    dispatch(apiFailureAction(err.message));
  }
}
