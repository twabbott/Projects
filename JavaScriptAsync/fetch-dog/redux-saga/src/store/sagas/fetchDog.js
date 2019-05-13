import * as actions from "../reducers/actions";

import { takeLatest, put } from "redux-saga/effects";

export function* watcherSaga() {
  console.log("watcherSaga: start");

  // This is a one-time setup step.  We need to tell redux-saga to
  // watch for every occurrence of the FETCH_DOG action, and when
  // the action is complete then call our workerSaga() function.
  yield takeLatest(actions.FETCH_DOG, workerSaga);

  console.log("watcherSaga: complete");
}

function* workerSaga() {
  console.log("workerSaga; start");

  try {
    // Use the yield keyword for any funciton that returns a
    // promise.  Redux-saga will handle the promise for us (in
    // much the same way as when we used async/await)
    const response = yield fetch("https://dog.ceo/api/breeds/image/random");
    const data = yield response.json();

    // Use put() to dispatch an action to Redux.
    yield put(actions.fetchDogSuccessAction(data.message));

    console.log("workerSaga: success");
  } catch (error) {
    yield put(actions.fetchDogErrorAction(error.message));
    console.log("workerSaga: error");
  }
}
