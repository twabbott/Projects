import {
  createSlice,
  AnyAction,
  CreateSliceOptions,
  CaseReducers,
  CaseReducer,
  Action,
  Reducer,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { deepFreeze } from './deep-freeze';

declare interface TypedActionCreator<Type extends string> {
  (...args: any[]): Action<Type>;
  type: Type;
}

export interface SliceActionsType {
  [key: string]: <PayloadType>(payload?: PayloadType) => Action;
}

export interface RtkSliceType<SliceType = any> {
  name: string;
  reducer: Reducer<SliceType>;
  actions: SliceActionsType;
  caseReducers: any;
  initialState: SliceType;
  selector: (state: any) => SliceType;
}

export interface SliceBuilderType<SliceType> {
  initialState: (state: SliceType) => SliceBuilderType<SliceType>;
  reducers: (
    reducerMap: SliceCaseReducers<SliceType>
  ) => SliceBuilderType<SliceType>;
  extraReducers: (
    reducerMap: CaseReducers<SliceType, AnyAction>
  ) => SliceBuilderType<SliceType>;
  addCase<ActionCreator extends TypedActionCreator<string>>(
    actionCreator: ActionCreator | string,
    reducer: CaseReducer<SliceType, ReturnType<ActionCreator>>
  ): SliceBuilderType<SliceType>;
  options: () => CreateSliceOptions;
  create: () => RtkSliceType<SliceType>;
}

export function sliceBuilder<SliceType>(
  name: string
): SliceBuilderType<SliceType> {
  let sliceOptions: CreateSliceOptions<SliceType> = {
    name,
  } as any;

  const builder: SliceBuilderType<SliceType> = {
    initialState(state: SliceType): SliceBuilderType<SliceType> {
      if (!state || typeof state !== 'object') {
        throw new Error('Initial state must be an object');
      }

      sliceOptions = {
        ...sliceOptions,
        initialState: deepFreeze(state),
      };

      return builder;
    },

    reducers(
      reducerMap: SliceCaseReducers<SliceType>
    ): SliceBuilderType<SliceType> {
      if (!reducerMap || typeof reducerMap !== 'object') {
        throw new Error('Reducer map must be an object');
      }

      sliceOptions = {
        ...sliceOptions,
        reducers: {
          ...sliceOptions.reducers,
          ...reducerMap,
        },
      };

      return builder;
    },

    extraReducers(
      reducerMap: CaseReducers<SliceType, AnyAction>
    ): SliceBuilderType<SliceType> {
      if (!reducerMap || typeof reducerMap !== 'object') {
        throw new Error('Reducer map must be an object');
      }

      sliceOptions = {
        ...sliceOptions,
        extraReducers: {
          ...sliceOptions.extraReducers,
          ...reducerMap,
        },
      };

      return builder;
    },

    addCase<ActionCreator extends TypedActionCreator<string>>(
      actionCreator: ActionCreator | string,
      reducer: CaseReducer<SliceType, ReturnType<ActionCreator>>
    ): SliceBuilderType<SliceType> {
      sliceOptions = {
        ...sliceOptions,
        extraReducers: {
          ...sliceOptions.extraReducers,
          [actionCreator.toString()]: reducer,
        },
      };

      return builder;
    },

    options(): CreateSliceOptions<SliceType> {
      return sliceOptions;
    },

    create(): RtkSliceType<SliceType> {
      if (
        (sliceOptions.reducers
          ? Object.keys(sliceOptions.reducers).length
          : 0) < 1 &&
        (sliceOptions.extraReducers
          ? Object.keys(sliceOptions.extraReducers).length
          : 0) < 1
      ) {
        throw new Error(
          `No reducers have been defined for slice ${sliceOptions.name}.`
        );
      }

      const slice: RtkSliceType<SliceType> = createSlice(sliceOptions) as any;

      slice.initialState = sliceOptions.initialState;
      slice.selector = (state: any): SliceType => state[sliceOptions.name];

      return slice;
    },
  };

  return builder;
}
