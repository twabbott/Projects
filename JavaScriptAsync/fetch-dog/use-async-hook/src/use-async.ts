import { useState, useEffect, useRef } from 'react';

// export type AsyncFunction<ResultType = void> = (...args: any[]) => Promise<ResultType>;

// function withLogging<T extends (...args: any[]) => any>(func: T): (...funcArgs: Parameters<T>) => ReturnType<T> {
//   const funcName = func.name;

//   // Return a new function that tracks how long the original took
//   return (...args: Parameters<T>): ReturnType<T> => {
//     console.time(funcName);
//     const results = func(...args);
//     console.timeEnd(funcName);
//     return results;
//   };
// }

// function add(x: number, y: number): number {
//   return x + y;
// }

// const addWithLogging = withLogging(add);

/*
I'm stuck, here.  Found these articles:

Original blog post on typing HOFs (using ReturnType<T> and Parameters<T>):
  https://spin.atomicobject.com/2019/01/11/typescript-higher-order-functions/

How to un-pack the type of a promise:
  https://stackoverflow.com/questions/48011353/how-to-unwrap-type-of-a-promise
  https://www.jpwilliams.dev/how-to-unpack-the-return-type-of-a-promise-in-typescript

Other articles:
  https://dev.to/busypeoples/notes-on-typescript-returntype-3m5a

*/

export interface AsyncOperationState<CallbackType, ResultType> {
  invoke: CallbackType;
  result?: ResultType;
  isBusy: boolean;
  error?: Error;
}

type AsyncReturnType<T extends (...args: any) => any> =
	T extends (...args: Parameters<T>) => Promise<infer U> ? U :
	T extends (...args: Parameters<T>) => infer U ? U :
  any;
  
export default function useAsync<CallbackType extends (...args: any[]) => any>(
  callback: CallbackType
): AsyncOperationState<(...funcArgs: Parameters<CallbackType>) => ReturnType<CallbackType>, AsyncReturnType<CallbackType>> {
  const operationRef: any = useRef({});
  const callbackRef: any = useRef();
  const isMountedRef: any = useRef(undefined);
  const [isBusy, setIsBusy] = useState(false);
  const [result, setResult] = useState(undefined);
  const [error, setError] = useState(undefined);

  // If caller is using a locally-defined function, this will
  // keep things up to date.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Detect if component gets un-mounted
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  async function invoke(...args: Parameters<CallbackType>): Promise<CallbackType | undefined> {
    if (isBusy) {
      throw new Error('Request is in progress');
    }

    try {
      setIsBusy(true);
      setResult(undefined);
      setError(undefined);

      const data: any = await callbackRef.current(...args);

      if (isMountedRef.current) {
        setIsBusy(false);
        setResult(data);
      }

      return data;
    } catch (err) {
      if (isMountedRef.current) {
        setIsBusy(false);
        setError(err);
      }
    }

    return undefined;
  }

  operationRef.current.invoke = invoke;
  operationRef.current.result = result;
  operationRef.current.isBusy = isBusy;
  operationRef.current.error = error;

  return operationRef.current;
}
