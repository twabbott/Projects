import { Action, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { useEffect, useRef } from 'react';
import { Selector } from 'reselect';

export type DispatchHandlerType = (action: Action) => void;
export type SelectHandlerType = (state: any, ...args: any[]) => any;
export type ListenerCallbackHandlerType = (
  action: Action,
  dispatch?: DispatchHandlerType,
  select?: SelectHandlerType,
  control?: ListenerControlType
) => void;

export type ListenerControlType = {
  cancel: () => void;
};

export type ListenerCallbackInfoType = {
  id: symbol;
  types: string[];
  callback: ListenerCallbackHandlerType;
  cancel: () => void;
};

export type ListenerMapType = {
  [type: string]: ListenerCallbackInfoType[];
};

export type ListenerCollectionType = {
  [index: string]: ListenerCallbackInfoType[];
};

export type UseActionListenerType = (
  callback: ListenerCallbackHandlerType
) => void;

const allListeners: ListenerCollectionType = {};

export const actionListenerMiddleware = ({
  getState,
  dispatch,
}: MiddlewareAPI): any => {
  function select(selector: Selector<any, any>): any {
    return selector(getState());
  }

  return (next: Dispatch<AnyAction>) => <A extends Action>(action: A) => {
    const result: A = next(action);
    if (action.type in allListeners) {
      console.log('### dispatching handler for', action.type);
      allListeners[action.type].forEach((listener) => {
        listener.callback(action, dispatch, select);
      });
    }
    return result;
  };
};

export function addListener(
  actions: string | string[],
  callback: ListenerCallbackHandlerType
): ListenerCallbackInfoType {
  const id = Symbol('redux-event-listener');
  const types = Array.isArray(actions) ? actions : [actions];

  function cancel(): void {
    let count = 0;
    types.forEach((type) => {
      console.log('### Cancelling handler for', type);
      allListeners[type] = allListeners[type].filter((item) => {
        if (item.id === id) {
          // this is debug code, and will be stripped out
          count += 1;
        }
        return item.id !== id;
      });

      console.log('### Cancelled', count, 'handlers');
    });
  }

  const listener = {
    id,
    types,
    callback,
    cancel,
  };

  for (const type of types) {
    if (!(type in allListeners)) {
      console.log('### Adding brand-new handler for', type);
      allListeners[type] = [];
    } else {
      console.log('### Adding handler for', type);
    }

    allListeners[type].push(listener);
  }

  return listener;
}

export function createActionListener(
  actions: string | string[]
): UseActionListenerType {
  return (callback: ListenerCallbackHandlerType): void => {
    const listenerRef = useRef<ListenerCallbackInfoType>();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
      // Make sure we're always using the latest callback.
      if (!listenerRef.current) {
        listenerRef.current = addListener(actions, callback);
      } else {
        listenerRef.current.callback = callback;
      }
    }, [callback]);

    useEffect(() => {
      // Clean up handler on un-mount
      return () =>
        listenerRef.current &&
        listenerRef.current.cancel &&
        listenerRef.current.cancel();
    }, []);
  };
}
