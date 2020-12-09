import React, { useEffect, useState } from 'react';
import useAsync from './use-async';
import { render, act } from '@testing-library/react';

function sleep(timeout: number): Promise<void> {
  return new Promise(resolve => { setTimeout(resolve, timeout) });
}

describe('use-async', () => {
  const mockOperation = jest.fn();

  const stateChanges: any[] = [];

  function TestComponent(props: any): React.ReactElement<any> {
    const operation = useAsync(mockOperation);

    useEffect(() => {
      operation.invoke()
        .then(() => {
          stateChanges.push('done');
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [operation]);

    const state = [
      operation.isBusy,
      operation.result,
      operation.error,
      props.count
    ];
    stateChanges.push(state);

    return <>{props.count}</>;
  }

  function BusyComponent(): React.ReactElement {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (count < 3) {
        setCount(count + 1);
      }
    }, [count]);

    return <TestComponent count={count} />
  }

  function BadComponent(): React.ReactElement {
    const operation = useAsync(mockOperation);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (count < 1) {
        setCount(count + 1);
      }
    }, [count]);

    useEffect(() => {
      operation.invoke()
        .then(
          () => stateChanges.push('Done'),
          (err: Error) => stateChanges.push(err.message)
        );
    }, [operation, count]);

    return <span></span>
  }

  afterEach(() => {
    jest.clearAllMocks();
    stateChanges.length = 0;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should handle getting a successful result from the operation', async () => {
    const mockResult = 'Success';
    mockOperation.mockResolvedValue(mockResult);
    
    await act(async () => {
      await render(<TestComponent count={0} />);
    });

    expect(stateChanges).toStrictEqual([
      [false, undefined, undefined, 0], // Component mount, useEffect not yet called
      [true, undefined, undefined, 0],  // useEffect called.  Operation is busy
      [false, mockResult, undefined, 0], // operation completed successfully
      'done'
    ]);
  });

  it('should handle exception from the operation', async () => {
    const msg = 'blaaaarg';
    mockOperation.mockRejectedValue(new Error(msg));
    
    await act(async () => {
      await render(<TestComponent count={0} />);
    });

    expect(stateChanges).toStrictEqual([
      [false, undefined, undefined, 0], // Component mount, useEffect not yet called
      [true, undefined, undefined, 0],  // useEffect called.  Operation is busy
      [false, undefined, new Error(msg), 0], // operation completed with an error
      'done'
    ]);
  });

  it('should remain stable when parent component re-renders', async () => {
    const mockResult = 'Success';
    mockOperation.mockImplementation(async () => {
      await sleep(100);
      return mockResult;
    });

    await act(async () => {
      await render(<BusyComponent />);
      await sleep(200);
    });

    expect(stateChanges).toStrictEqual([
      [false, undefined, undefined, 0], // Component mount, useEffect not yet called
      [true, undefined, undefined, 1],  // useEffect called.  Operation is busy.  count=0
      [true, undefined, undefined, 2],  // useEffect called.  Operation is busy.  count=1
      [true, undefined, undefined, 3],  // useEffect called.  Operation is busy.  count=3
      [false, mockResult, undefined, 3], // operation completed successfully
      'done'
    ]);
  });

  it ('should handle component unmounting before operation completes', async () => {
    const mockResult = 'Success';
    mockOperation.mockImplementation(async () => {
      await sleep(100);
      return mockResult;
    });

    function BusyComponent() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        if (count < 3) {
          setCount(count + 1);
        }
      }, [count]);

      if (count > 2) {
        return <span></span>;
      }

      return <TestComponent count={count} />
    }

    await act(async () => {
      await render(<BusyComponent />);
      await sleep(200);
    });

    expect(stateChanges).toStrictEqual([
      [false, undefined, undefined, 0], // Component mount, useEffect not yet called
      [true, undefined, undefined, 1],  // useEffect called.  Operation is busy.  count=0
      [true, undefined, undefined, 2],  // useEffect called.  Operation is busy.  count=1
      'done'
    ]);
  });

  it ('should handle component unmounting before operation errors out', async () => {
    const msg = 'blaaaarg';
    mockOperation.mockImplementation(async () => {
      await sleep(100);
      throw new Error(msg);
    });

    function BusyComponent() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        if (count < 3) {
          setCount(count + 1);
        }
      }, [count]);

      if (count > 2) {
        return <span></span>;
      }

      return <TestComponent count={count} />
    }

    await act(async () => {
      await render(<BusyComponent />);
      await sleep(200);
    });

    expect(stateChanges).toStrictEqual([
      [false, undefined, undefined, 0], // Component mount, useEffect not yet called
      [true, undefined, undefined, 1],  // useEffect called.  Operation is busy.  count=0
      [true, undefined, undefined, 2],  // useEffect called.  Operation is busy.  count=1
      'done'
    ]);
  });

  it ('should error out if the operation is invoked while busy', async () => {
    const mockResult = 'Success';
    mockOperation.mockImplementation(async () => {
      await sleep(100);
      return mockResult;
    });

    await act(async () => {
      await render(<BadComponent />);
      await sleep(200);
    });

    expect(stateChanges).toStrictEqual([
      'Request is in progress',
      'Done'
    ]);
  });
});
