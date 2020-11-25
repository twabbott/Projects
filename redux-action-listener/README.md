# Redux Action Listener

React components that manage their own internal state have no way of responding to external events. A good example where this might be needed would be a dashboard widget, like the kind used in web.homepage. Such a widget might need to know when the following has changed:

Global refresh button has been clicked, and we don’t want to reload the entire page.

Dealership id changed

Franchise changed

In each of these cases, it would be helpful if the component could be notified when a particular redux action has been dispatched, after the store has had a chance to update.

The current solution (either the usecase pattern, or even the traditional redux pattern) would require that each widget keep its state in redux, and then have a worker saga (redux saga) listen for update events and fire off API requests. This requires a good deal of boilerplate code and exhaustive testing, which adds to the complexity of any story/defect that a developer must complete.

This proof of concept presents a novel solution using react hooks, that allows a component to independently subscribe to the store and register a callback with redux, which will then be invoked whenever one or more requested actions are dispatched.

This proof of concept has the added benefit that any top-level component can now manage global state events without needing to rely on redux saga.

 

## Middleware setup
Before creating an action listener, you must register the listener middleware:

```
const middlewares = [
  routerMiddleware(history),
  sagaMiddleware,
  actionListenerMiddleware, // Register action-listener middleware
];
```

This is a one-time setup step, which must be performed for each repo where you want to use this proof of concept.

 

## Creating action listeners
To create action-listeners, I provide a higher-order function called createActionListener, which takes one or more action type-names (variable-argument list), and returns a react hook which your component can import.

Typically you would define all action-listener hooks in the same file where you define your redux actions. Here is an example of an action-listener that listens for changes to the filter settings on the desk log page:

```
export const useUpdateFiltersActionListener = createActionListener(
  types.UPDATE_FILTERS
);
```

As the code implies, createActionListener returns a custom react hook, which you can use inside your component.

 

## Responding to redux actions
Ok, now it’s time make a component that listens for UPDATE_FILTER events, and then refreshes some data that it fetches from an API endpoint. Note that in this case, the data is completely unrelated to anything else on the page, which is consistent with the behavior of a self-contained widget.

```
export function WeatherWidget(): React.ReactElement {
  const [loadTemp, isBusy, temperature] = useAsyncOperation(fakeWeatherApi);

  // Re-load whenever someone fires off a UPDATE_FILTER action
  useUpdateFiltersActionListener(loadTemp);

  // Load on mount
  useEffect(() => {
    loadTemp();
  }, []);
```

I’m calling my useAsyncOperation hook, which hides all of the boilerplate and state management required for fetching data from an API endpoint. This custom hook returns a synchronous wrapper function which we can call whenever we want to load the data, which we do on two occasions:

At the very start, when the component first mounts.

Whenever anything else fires off the UPDATE_FILTER action

## Conclusion
And that’s all there is to it.
* No need to write a whole redux slice
* No need to write a saga
* No need to write unit tests for all this, nor do you have to worry about additional code coverage.
* No custom logic is contained within the component, itself.
* No mess. No fuss. No stress.
