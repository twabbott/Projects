# Fetch Dog - Redux with Redux-Saga

This example demonstrates using redux with redux-saga middleware to perform 
an asynchronous operation.  

The purpose of this example is to show how you would extract out the async business logic into a saga.  This is a preferred
design pattern in React, because your component should not have to concern itself with fetching data.

Personally, I'm not sold on the idea of sagas.  For simple async logic they're way too complex.  For more complex logic 
(where event A completes and fires off event B, which fires off event C), it can become difficult to follow and it's easy
to get lost in your code.

# How to run this project
This project was created using `create-react-app`.  Run this using the following terminal commands:
```
npm install
npm start
```
