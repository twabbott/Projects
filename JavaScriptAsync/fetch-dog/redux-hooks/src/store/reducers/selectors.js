// Selectors read from the store

export function isFetchingSelector(state) {
  return state.fetching;
}

export function dogUrlSelector(state) {
  return state.dog;
}

export function errorMessageSelector(state) {
  return state.error;
}
