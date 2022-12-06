import React, { createContext, useState } from "react";

// Define an initial state object.  You need properties
// for all values and all updater methods.
const initialState = { 
    count: 42,
    countIncremented: () => {},
    countDecremented: () => {}
};

// Create your context (note the "Context" suffix)
const CounterContext = createContext(initialState);

// Create your provider class
export function CounterProvider({children}) {
    // I'm using useState to hold state.
    const [count, setCount] = useState(initialState.count);

    // Declare one or more updater functions
    function countIncremented() {
        setCount(count + 1);
    }

    function countDecremented() {
        setCount(count - 1);
    }

    // Every time there is an update, this value property 
    // gets a new object which represents the updated state.
    return (<CounterContext.Provider value={{
        count,
        countIncremented,
        countDecremented
    }}>
        {children}
    </CounterContext.Provider>);
}

export default CounterContext;
