// Selectors read from the store

// Selectors are overkill for a small project like this, but in
// larger applications they allow you to divide your store into
// "slices", and they make it so that your component does not
// have to know intimate details about how your store is structured.

// We need a slice selector.  In this case our slice is the entire
// store.  In cases where we call combineReducers(), this function
// would return just our slice.
function fetchSlice(state) {
  return state; 
}

// All of my selectors end with the suffix, "Selector" so that I
// can tell them apart from other functions in my project.
export function isFetchingSelector(state) {
  return fetchSlice(state).fetching;
}

export function dogUrlSelector(state) {
  return fetchSlice(state).dog;
}

export function errorMessageSelector(state) {
  return fetchSlice(state).error;
}
