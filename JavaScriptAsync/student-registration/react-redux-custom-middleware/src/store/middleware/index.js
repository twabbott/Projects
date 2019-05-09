
const listeners = {};

export function addListener(actionType, callback) {
  listeners[actionType] = callback;
}

const middleware = store => {
  const storeWrapper = {
    select: selector => selector(store.getState()),
    dispatch: (action) => store.dispatch(action)
  }
  
  return next => action => {  
    console.log(action.type);
    next(action);

    if (listeners.hasOwnProperty(action.type)) {
      storeWrapper.action = action;
      listeners[action.type](storeWrapper);
    }
  }
}


export default middleware;