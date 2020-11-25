// Taken from MDN (with some tweaks):
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze#:~:text=function%20deepFreeze(object)

export function deepFreeze<Type = any>(object: Type): Type {
  if (!object || typeof object !== 'object') {
    return object;
  }

  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (const name of propNames) {
    const value: any = (<any>object)[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
