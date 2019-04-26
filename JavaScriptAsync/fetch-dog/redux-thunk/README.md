# Fetch Dog - Redux with Redux-Thunk

This example demonstrates using redux with redux-thunk middleware to perform 
an asynchronous operation.  

The purpose of this example is to show how you would extract out the async business logic into a thunk.  This is a preferred
design pattern in React, because your component should not have to concern itself with fetching data.

I have two thunks, one that uses promises called `fetchDogThunkPromise`, and another that uses async/await called `fetchDogThunkAsync`.  You can switch between them in `App.js` by changing line 16 where I'm calling `mapDispatchToProps`.

Personally, I prefer the async version, as the logic is more straightforward and as your application scales up and you begin to 
have more complicated event logic, you are less prone to getting stuck in a morass of nested promises.

# How to run this project
This project was created using `create-react-app`.  Run this using the following terminal commands:
```
npm install
npm start
```
