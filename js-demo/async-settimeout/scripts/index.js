import { writeLine } from './pageConsole.js';

async function sleep(msTime) {
  return new Promise(resolve => setTimeout(resolve, msTime));
}

async function slowLoop() {
  for (let i = 0; i < 10; i++) {
    writeLine(i);
    await sleep(1000);
  }
}

/***************************************************
 ** Example of calling an async function from a non-async
 ** function.  In this case, slowLoop will return immediately
 ** and this code will run to completion.  Then the promise
 ** will complete later.  The output will be: Started, 0, 
 ** Finhed, 1, 2, 3, etc...
 **/
//(() => { // IIFE is completely superflous.
// writeLine("Started");
// await slowLoop();
// writeLine("Finished");
//})();


/***************************************************
 ** Example of calling an async funciton within an async function.
 ** This function will execute in a synchronous manner without ever
 ** blocking.  Output will be: Started, 0, 1, 2, ... 8, 9, Finished
 **/
(async () => {
  writeLine("Started");
  await slowLoop();
  writeLine("Finished");
})();
