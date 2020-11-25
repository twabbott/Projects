import { createAction } from '@reduxjs/toolkit';
import { Action } from 'redux-actions';
import { sliceBuilder } from './slice-builder';
import { storeHelper } from './store-helper';

interface CounterSliceType {
  count: number;
}

describe('slice-builder', () => {
  const sliceName = 'testSlice';
  const initialState: CounterSliceType = {
    count: 0,
  };

  const incrementFunc = (slice: CounterSliceType): void => {
    slice.count += 1;
  };
  const decrementFunc = (slice: CounterSliceType): void => {
    slice.count -= 1;
  };
  const changeByFunc = (
    slice: CounterSliceType,
    action: Action<number>
  ): void => {
    slice.count += action && action.payload ? action.payload : 0;
  };

  const reducerMap = {
    incrementAction: incrementFunc,
    decrementAction: decrementFunc,
    changeByAction: changeByFunc,
  };

  const incrementBy = createAction('incrementBy');

  it('should return a basic builder object with a name', () => {
    const builder = sliceBuilder<CounterSliceType>(sliceName);

    expect(builder.options()).toEqual({ name: sliceName });
  });

  describe('initialState', () => {
    it('should add an initial state object', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName).initialState(
        initialState
      );

      expect(builder.options()).toEqual({
        name: sliceName,
        initialState,
      });
    });

    it('should throw an error if initial state is not an object', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName);

      expect(() => builder.initialState(undefined as any)).toThrow();
      expect(() => builder.initialState(100 as any)).toThrow();
    });

    it('should freeze initial state object', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName)
        .initialState(initialState)
        .reducers(reducerMap);

      expect(() => {
        builder.options().initialState.count = 6;
      }).toThrow();

      const slice = builder.create();

      expect(() => {
        slice.initialState.count = 6;
      }).toThrow();
    });
  });

  describe('reducers', () => {
    it('should add an empty reducer map', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName).reducers({});

      expect(builder.options()).toEqual({ name: sliceName, reducers: {} });
    });

    it('should add a real reducer map', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName).reducers(
        reducerMap
      );

      expect(builder.options()).toEqual({
        name: sliceName,
        reducers: reducerMap,
      });
    });

    it('should throw an error if reducer map is not an object', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName);

      expect(() => builder.reducers(undefined as any)).toThrow();
      expect(() => builder.reducers(10 as any)).toThrow();
    });
  });

  describe('extraReducers', () => {
    it('should add an extra-reducers map', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName).reducers(
        reducerMap
      );

      expect(builder.options()).toEqual({
        name: sliceName,
        reducers: reducerMap,
      });
    });

    it('should throw an error if reducer map is not an object', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName);

      expect(() => builder.extraReducers(undefined as any)).toThrow();
      expect(() => builder.extraReducers(10 as any)).toThrow();
    });
  });

  describe('addCase', () => {
    it('should add a case using a string and a func', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName);
      builder.addCase('foo', incrementFunc);

      expect(builder.options()).toEqual({
        name: sliceName,
        extraReducers: { foo: incrementFunc },
      });
    });

    it('should add a case using an action-creator and a func', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName);
      builder.addCase(incrementBy, changeByFunc);

      expect(builder.options()).toEqual({
        name: sliceName,
        extraReducers: { [incrementBy.toString()]: changeByFunc },
      });
    });
  });

  describe('create', () => {
    it('should throw an error if no reducers or extra reducers are defined', () => {
      const builder = sliceBuilder<CounterSliceType>(sliceName);

      expect(() => builder.create()).toThrow(
        'No reducers have been defined for slice'
      );
    });

    it('should create a new slice with reducers', () => {
      const slice = sliceBuilder<CounterSliceType>(sliceName)
        .initialState({ count: 123 })
        .reducers(reducerMap)
        .create();

      storeHelper.mergeNamedSlice(slice);

      expect(slice.name).toEqual(sliceName);
      expect(slice.initialState).toEqual({ count: 123 });

      const expected1 = {
        type: 'testSlice/incrementAction',
        payload: undefined,
      };
      expect(JSON.stringify(slice.actions.incrementAction())).toBe(
        JSON.stringify(expected1)
      );

      const expected2 = {
        type: 'testSlice/changeByAction',
        payload: 100,
      };
      expect(JSON.stringify(slice.actions.changeByAction(100))).toBe(
        JSON.stringify(expected2)
      );
    });

    it('should create a new slice with extraReducers', () => {
      const slice = sliceBuilder<CounterSliceType>(sliceName)
        .initialState({ count: 123 })
        .extraReducers({ fooAction: () => {} } as any)
        .create();

      storeHelper.mergeNamedSlice(slice);

      expect(slice.name).toEqual(sliceName);
      expect(slice.initialState).toEqual({ count: 123 });
    });

    it('slice selector should select the slice', () => {
      const slice = sliceBuilder<CounterSliceType>(sliceName)
        .initialState({ count: 123 })
        .reducers(reducerMap)
        .extraReducers({ fooAction: () => {} } as any)
        .create();

      storeHelper.mergeNamedSlice(slice);

      const mockStore = {
        [sliceName]: 12345,
      };

      expect(slice.selector(mockStore)).toEqual(12345);
    });
  });
});
