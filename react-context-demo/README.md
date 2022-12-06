# React Context Demo

This project gives you a concise example of React context, and how to use it properly.

Keep in mind, React context is not for general state management, as it is fairly inefficient in 
terms of updates.  React context is best-suited for keeping state that changes infrequently (or 
rarely).  Usually context is used for things that are set when your page first loads.  Here are 
some examples:

* Authentication, authorization, and permissions
* Theme
* User preferences and settings
* Feature enablement
* Localization

In this example, the context has one data property, which is a count.  It also exposes two 
functions, one to increment the count and one to decrement it.

I have two components that use the context so that you can see an example of how to use the
context.
