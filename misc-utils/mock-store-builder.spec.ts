import { Action, Dispatch } from 'redux';
import { createAction } from 'redux-actions';

import { createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { mockStoreBuilder } from './mock-store-builder';
import { sliceBuilder } from '../slice-builder';
import { ThunkReturnType } from '../thunks.types';

interface TestSliceType {
  count: number;
}

describe('mock-store-builder', () => {
  const sliceName = 'counterSlice';

  const initialState: any = {
    count: 0,
  };

  const INCREMENT = 'INCREMENT';
  const incrementAction = createAction(INCREMENT);
  const DECREMENT = 'DECREMENT';
  const decrementAction = createAction(DECREMENT);

  function mockReducer(state: any = initialState, action: Action): any {
    jest.spyOn(console, 'error');

    switch (action.type) {
      case INCREMENT:
        return {
          ...state,
          count: state.count + 1,
        };

      case DECREMENT:
        return {
          ...state,
          count: state.count - 1,
        };

      default:
        return state;
    }
  }

  const rtkSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      incrementAction: (slice: any) => {
        slice.count += 1;
      },
      decrementAction: (slice: any) => {
        slice.count -= 1;
      },
    },
  });

  const sbSlice = sliceBuilder<TestSliceType>(sliceName)
    .initialState(initialState)
    .reducers({
      incrementAction: (slice: any) => {
        slice.count += 1;
      },
      decrementAction: (slice: any) => {
        slice.count -= 1;
      },
    })
    .create();

  function incrementThunk(): ThunkReturnType {
    return async (dispatch: Dispatch): Promise<void> => {
      await Promise.resolve();
      dispatch(sbSlice.actions.incrementAction());
    };
  }

  const storeBuilder = mockStoreBuilder([], expect)
    .addReducer(sliceName, initialState, mockReducer)
    .addReducer('unused', {}, (state: any): any => state);

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should have good default behavior', () => {
    const store = storeBuilder.create();

    store.dispatch(decrementAction());

    store.validateActions(decrementAction());
    store.validateSlice(sliceName, { count: -1 });
  });

  it('should validate actions', () => {
    const store = storeBuilder.create({ [sliceName]: { count: 100 } });

    store.dispatch(incrementAction());

    store.validateActions(incrementAction());
  });

  it('should validate slice', () => {
    const store = storeBuilder.create({ [sliceName]: { count: 100 } });

    store.dispatch(incrementAction());

    store.validateSlice(sliceName, { count: 101 });
  });

  it('should validate actions', () => {
    const store = storeBuilder.create({ [sliceName]: { count: 100 } });

    store.dispatch(incrementAction());

    store.validateState({ [sliceName]: { count: 101 } });
  });

  it("should work with a slice built with RTK's createSlice", () => {
    const store = mockStoreBuilder([], expect)
      .addSlice(rtkSlice, initialState)
      .create({ [sliceName]: { count: 100 } });

    store.dispatch(rtkSlice.actions.incrementAction());

    store.validateState({ [sliceName]: { count: 101 } });
  });

  it('slice created with createSlice needs initialState', () => {
    expect(() => {
      mockStoreBuilder([], expect)
        .addSlice(rtkSlice)
        .create({ [sliceName]: { count: 100 } });
    }).toThrow('addSlice requires an initialState');
  });

  it('should work with a slice built with sliceBuilder', () => {
    const store = mockStoreBuilder([], expect)
      .addSlice(sbSlice, initialState)
      .create({ [sliceName]: { count: 100 } });

    const action = sbSlice.actions.incrementAction;
    store.dispatch(action());

    store.validateState({ [sliceName]: { count: 101 } });
  });

  it('should handle a reducer throwing an exception', () => {
    const message = '👍 This was an expected error';
    function badReducer(): any {
      throw new Error(message);
    }

    const store = mockStoreBuilder([], expect)
      .addReducer('bogus', {}, badReducer)
      .create();

    expect(() => {
      store.dispatch({ type: 'foo' });
    }).toThrow(message);
  });

  it('should handle dispatching a thunk', async () => {
    const store = mockStoreBuilder([thunk], expect)
      .addSlice(sbSlice, initialState)
      .create({ [sliceName]: { count: 100 } });

    await store.dispatch(incrementThunk());

    store.validateState({ [sliceName]: { count: 101 } });
  });
});
