import { useState, useEffect, useRef } from 'react';

export type AsyncFunction<ResultType = void> = (...args: any[]) => Promise<ResultType>;

export interface AsyncOperationState<ResultType> {
  invoke: AsyncFunction<ResultType | undefined>;
  result?: ResultType;
  isBusy: boolean;
  error?: Error;
}

export default function useAsync<ResultType>(
  callback: AsyncFunction<ResultType>
): AsyncOperationState<ResultType> {
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

  async function invoke(...args: any[]): Promise<ResultType | undefined> {
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
