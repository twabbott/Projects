import { combineReducers } from "redux";

import appStateReducer from "./appState/reducer";
import studentReducer from "./students/reducer";

// Combine all reducers here into one glorious über-reducer!
const rootReducer = combineReducers({
  appState: appStateReducer,
  students: studentReducer
});

export default rootReducer;
