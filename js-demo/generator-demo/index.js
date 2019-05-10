function countdownDemo() {
  function* exampleGenerator(limit) {
    console.log(`*** Started with limit of ${limit}.`);

    for (let i = 0; i < limit; i++) {
      console.log(`*** Yielding a ${i}`);
      yield i;
    }
    
    console.log("*** ended");
  }

  console.log("calling generator func");
  let iterator = exampleGenerator(10);
  console.log("beginning loop");
  for (let count = 0; count < 15; count++) {
    console.log(`loop pass ${count}`)
    let val = iterator.next();
    console.log(`yielded value ${val.value}`);
    if (val.done) {
      console.log("iterator has finished");
      break;
    }
  }
}

function foreachDemo() {
  // Demonstrates using the yield statement to return an intermediate
  // result.
  function* iterateOver(arrayData) {
    for (item of arrayData) {
      yield item;
    }
  }

  const iterator = iterateOver(['apple', 'banana', 'pear', 'grapes']);

  for (let val = iterator.next(); !val.done; val = iterator.next()) {
    console.log(val.value);
  }
}

function messageDemo() {
  // Demonstrates using the yield statement to send commands to a
  // generator function.
  function* messages() {
    console.log("Iterator starting up");

    let done = false;
    while (!done) {
      let message = yield;
      switch (message) {
        case 1:
          console.log("Hello, world!");
          break;

        case 2:
          console.log("Hola, mundo");
          break;

        case 3:
          console.log("guten tag, welt!");
          break;

        default:
          done = true;
          break;
      }
    }

    console.log("iterator has shut down");
  }

  // Call the iterator.  This does literally nothing but
  // create the iterator.
  const iterator = messages();
  
  // This tells the messages() function to go to the first 
  // yield at the start of the loop.  
  iterator.next(); 

  // Dispatch input to our generator function.  These can
  // come in any order.
  iterator.next(2);
  iterator.next(1);
  iterator.next(2);
  iterator.next(3);

  // We can also do this in a loop 
  for (let x = 1; x <= 3; x++) {
    iterator.next(x);
  }

  // Tell the iterator to shut down
  let val = iterator.next(0);
  if (val.done) {
    console.log("Iterator has completed");
  }
}

foreachDemo();
//messageDemo();

// function* countAppleSales (saleList) {
//   for (var i = 0; i < saleList.length; i++) {
//     yield saleList[i];
//   }
// }

// var appleStore = countAppleSales([3, 7, 5]); // Generator { }
// console.log(appleStore.next()); // { value: 3, done: false }
// console.log(appleStore.next()); // { value: 7, done: false }
// console.log(appleStore.next()); // { value: 5, done: false }
// console.log(appleStore.next()); // { value: undefined, done: true }
