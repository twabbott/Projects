This project was taken from the following blog post:

https://alligator.io/react/react-infinite-scroll/

Basically I took the sample code and
* Broke it up into separate components
* Factored out the `<InfiniteScroll>` component so that its only concern is rendering.  Everything is managed via props and callbacks.
* Individual `<User>` components have varying heights.  The `<InfiniteScroll>` component can gracefully handle children of varying heights
* Re-wrote promise logic to use asyc/await
* Used fetch API instead of superagent.

I am not sure how to get this to work inside an actual child component, since it sets the window.onscroll event.

> I'm impressed with how straightforward this is.  The only flaw with this sample code is that it has to work with the `window` object, and not a child DOM element.

Suggested improvements (fix these things if you want to use this for real):
* Get this to work with a child DOM element.  It would probably be best to require the user to embed this in a `<InfiniteScrollContainer>` component, which has a configurable size & styling.
* Maybe make everything be a render prop, since some props are just props and some things are render-props.
* Add prop-types / default props, etc.
