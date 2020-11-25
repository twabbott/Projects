import { deepFreeze } from './deep-freeze';

describe('deep-freeze', () => {
  it('should handle null and undefined', () => {
    expect(deepFreeze(undefined)).toBeUndefined();
    expect(deepFreeze(null)).toBeNull();
  });

  it('should handle primitive JavaScript types', () => {
    expect(deepFreeze(true)).toBe(true);
    expect(deepFreeze(false)).toBe(false);
    expect(deepFreeze(0)).toBe(0);
    expect(deepFreeze(1000)).toBe(1000);
    expect(deepFreeze('')).toBe('');
    expect(deepFreeze('Hello')).toBe('Hello');
  });

  it('should handle an empty object', () => {
    const frozen = deepFreeze({} as any);
    expect(frozen).toEqual({});

    expect(() => {
      frozen.foo = 5;
    }).toThrow('Cannot add property foo, object is not extensible');
  });

  it('should forbid changing a property', () => {
    const frozen = deepFreeze({ foo: 10 });
    expect(frozen).toEqual({ foo: 10 });

    expect(() => {
      frozen.foo = 5;
    }).toThrow("Cannot assign to read only property 'foo'");
  });

  it('should handle an empty array', () => {
    const frozen = deepFreeze([] as any);
    expect(frozen).toEqual([]);

    expect(() => {
      frozen[10] = 5;
    }).toThrow('Cannot add property 10, object is not extensible');
  });

  it('should forbid changing an array element', () => {
    const frozen = deepFreeze([1, 2, 3]);
    expect(frozen).toEqual([1, 2, 3]);

    expect(() => {
      frozen[1] = 5;
    }).toThrow("Cannot assign to read only property '1' of object");
  });

  it('should deep freeze a deep object', () => {
    const testObj: any = {
      colors: ['red', 'green', 'blue'],
      person: {
        first: 'John',
        last: 'Doe',
      },
      items: [
        { name: 'alpha', value: 1 },
        { name: 'bravo', value: 2 },
        { name: 'charlie', value: 3 },
      ],
    };

    const frozen = deepFreeze(testObj);
    expect(frozen).toEqual(testObj);

    expect(() => {
      frozen.colors[0] = 'hello';
    }).toThrow();
    expect(() => {
      frozen.person = 'hello';
    }).toThrow();
    expect(() => {
      frozen.person.first = 'hello';
    }).toThrow();
    expect(() => {
      frozen.person = 'hello';
    }).toThrow();
    expect(() => {
      frozen.items[0] = 'hello';
    }).toThrow();
    expect(() => {
      frozen.items[0].name = 'hello';
    }).toThrow();
  });
});
