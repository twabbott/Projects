import { put } from 'redux-saga/effects';
import { Action } from '@reduxjs/toolkit';
import { ThunkReturnType } from './thunks.types';

/**
 * Creates a worker saga from a thunk.  Useful when you need a thunk called
 * in response to a Redux action being dispatched.
 *
 * Usage:
 *   function* loadPageWatcher(): any {
 *     yield takeEvery(APP_INIT, thunkWorker(loadPageThunk));
 *   }
 *   mergeSaga(loadPageWatcher);
 *
 * @param thunk A thunk action creator
 */

export function thunkWorker(
  thunk: () => ThunkReturnType
): (action?: Action<any>) => any {
  return function* worker() {
    yield put(thunk() as any);
  };
}
