import { cloneableGenerator } from '@redux-saga/testing-utils';
import { put } from 'redux-saga/effects';
import { ThunkReturnType } from './thunks.types';

import { thunkWorker } from './thunk-helper';

function testAsyncThunk(): ThunkReturnType {
  return async (): Promise<void> => Promise.resolve();
}

function* testAsyncWorker(): any {
  yield put(testAsyncThunk() as any);
}

describe('thunk-helper', () => {
  it('thunkWorker should return a worker saga', () => {
    const worker = thunkWorker(testAsyncThunk);
    const generator = cloneableGenerator(worker)();

    const expected = JSON.stringify(generator.next().value);
    const actual = JSON.stringify(put(testAsyncThunk() as any));
    expect(expected).toEqual(actual);
  });

  describe('worker saga dispatching thunk', () => {
    it('should dispatch async thunk', () => {
      const generator = cloneableGenerator(testAsyncWorker)();

      const expected = JSON.stringify(generator.next().value);
      const actual = JSON.stringify(put(testAsyncThunk() as any));
      expect(expected).toEqual(actual);
    });
  });
});
