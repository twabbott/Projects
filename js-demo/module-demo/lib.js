let message = ''; // note: blank!

export function getMessage() {
	return message;
}

export function setMessage(msg) {
	message = msg;
}


/*
some main differences
* Modules can only be served from a server.  You can't double-click index.html and load a module.  This is a security feature.
* No more global scope!
* modules get loaded at the very end of page-load, so this means we can put them in the <head>
*/

