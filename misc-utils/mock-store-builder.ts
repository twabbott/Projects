import reduxMockStore, { MockStore } from 'redux-mock-store';
import { Middleware, Reducer, AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { Slice } from '@reduxjs/toolkit';
import { RtkSliceType } from '../slice-builder';

interface WrappedMockStoreType extends MockStore {
  dispatch: (action: any) => any;
  validateActions: (...expectedActions: AnyAction[]) => void;
  validateState: (changedProps: any) => void;
  validateSlice: (name: string, changedProps: any) => void;
}

type MockStoreBuilderType = {
  addReducer: <SliceType = any>(
    name: string,
    initialState: any,
    reducer: Reducer<SliceType>
  ) => MockStoreBuilderType;

  addSlice: <SliceType>(
    slice: Slice<SliceType> | RtkSliceType<SliceType>,
    initialState?: SliceType
  ) => MockStoreBuilderType;

  create: (startingState?: any) => WrappedMockStoreType;
};

type SliceMapItemType = {
  reducer: Reducer;
  initialState: any;
};

type SliceMapType = {
  [key: string]: SliceMapItemType;
};

/* istanbul ignore next */
function clone(value: any): any {
  if (value === null || value === undefined) {
    return value;
  }
  return JSON.parse(JSON.stringify(value));
}

export function mockStoreBuilder(
  middlewares: Middleware[],
  expect: jest.Expect
): MockStoreBuilderType {
  const sliceMap: SliceMapType = {};
  let state: any = {};

  // eslint-disable-next-line
  const mockStateMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any): any => {
    const result = next(action);

    try {
      for (const key in sliceMap) { // eslint-disable-line
        const { reducer } = sliceMap[key];
        state[key] = reducer(state[key], action);
      }
    } catch (error) {
      console.error('mockStoreBuilder middleware exception', error); // eslint-disable-line
      throw error;
    }

    return result;
  };

  const createMockStore = reduxMockStore([...middlewares, mockStateMiddleware]);

  function buildState(...changes: any[]): any {
    const newState: any = {};
    for (const key in sliceMap) { // eslint-disable-line
      newState[key] = clone(sliceMap[key].initialState);
      for (const object of changes) {
        if (key in object) {
          Object.assign(newState[key], object[key]);
        }
      }
    }

    return newState;
  }

  function create(initialStateChanges: any = {}): WrappedMockStoreType {
    state = buildState(initialStateChanges);

    const mockStore = createMockStore(() => state);

    function validateActions(...expectedActions: AnyAction[]): void {
      const actualActions = mockStore.getActions();

      expect(actualActions).toHaveLength(expectedActions.length);

      actualActions.forEach((actualValue: AnyAction, index: number) => {
        expect(actualValue).toEqual(expectedActions[index]);
      });
    }

    function validateState(expectedStateChanges: any): void {
      const expectedState = buildState(
        initialStateChanges,
        expectedStateChanges
      );

      expect(state).toEqual(expectedState);
    }

    function validateSlice(name: string, expectedSliceChanges: any): void {
      const expectedState = buildState(initialStateChanges, {
        [name]: { ...expectedSliceChanges },
      });

      expect(state).toEqual(expectedState);
    }

    const wrappedMockStore = {
      ...mockStore,
      validateActions,
      validateState,
      validateSlice,
    };

    return wrappedMockStore;
  }

  function addReducer<SliceType = any>(
    name: string,
    initialState: SliceType,
    reducer: Reducer<SliceType>
  ): MockStoreBuilderType {
    sliceMap[name] = {
      reducer,
      initialState: clone(initialState),
    };

    return self;
  }

  function addSlice<SliceType>(
    slice: Slice<SliceType> | RtkSliceType<SliceType>,
    initialState?: SliceType
  ): MockStoreBuilderType {
    const is = initialState || (<any>slice).initialState;
    if (!is) {
      throw new Error(
        'addSlice requires an initialState, either on the slice object itself, or as the second parameter.'
      );
    }

    sliceMap[slice.name] = {
      reducer: slice.reducer,
      initialState: clone(is),
    };

    return self;
  }

  const self: MockStoreBuilderType = {
    addReducer,
    addSlice,
    create,
  };

  return self;
}
