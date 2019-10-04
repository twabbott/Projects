# Fetch Dog - Redux + hooks
This example demonstrates using the following frameworks with React:
* redux
* react-redux, using their new hooks

> Note: This example does not use React hooks, per se--at least not directly.  Instead, it uses new custom hooks
created by react-redux, which streamlines things quite a bit.  No more mapStateToProps / mapDispatchToProps BS.  Just
call useSelector and useAction.

> Note: I am not using any middleware with Redux because this is just proof of concept code.  The logic to perform the async call really ought to be factored into a thunk or a saga.  This would give much better separation of concerns.

Resources for further reading:
* Documentation on using hooks from React Redux's [homepage](https://react-redux.js.org/next/api/hooks#hooks).
* Helpful [video](https://www.youtube.com/watch?time_continue=443&v=_oK9Jd8LH1E) on this topic.</li>


