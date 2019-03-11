import { combineReducers } from "redux";

import appStateReducer from "./appStateReducer";
import studentReducer from "./studentReducer";

import { logErrorAction } from "./appStateReducer";

const xxx = logErrorAction("Yerp!");

// Combine all reducers here into one glorious über-reducer!
const rootReducer = combineReducers({
    appState: appStateReducer,
    students: studentReducer
});

export default rootReducer;
