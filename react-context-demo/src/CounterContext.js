import React, { createContext, useState } from "react";

// Define an initial state object.  You need properties
// for all values and all updater methods.
const initialState = { 
    count: 42,
    setCount: () => {}
};

// Create your context (note the "Context" suffix)
const CounterContext = createContext(initialState);

// Create your provider class
export function CounterProvider({children}) {
    // I'm using useState to create a setter-function, but
    // you could just as easily put nested functions here
    // which would do the same thing.
    const [count, setCount] = useState(initialState.count);

    // Every time there is an update, this value property 
    // gets a new object which represents the updated state.
    return (<CounterContext.Provider value={{
        count,
        setCount
    }}>
        {children}
    </CounterContext.Provider>);
}

export default CounterContext;