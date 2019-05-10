import { writeLine } from './pageConsole.js';

async function sleep(msTime) {
  return new Promise(resolve => setTimeout(resolve, msTime));
}

async function someDay(name) {
  // Sleep between 1 and 5 seconds
  const timeout = 4000 * Math.random() + 1000;
  await sleep(timeout);

  // Throw an exception 10% of the time
  if (Math.random() <= .10) {
    throw new Error(name);
  }

  // Otherwise return successfully
  writeLine(`${name} completed in ${timeout}ms.`);

  // This value gets populated into the array that 
  // is returned by Promise.all().
  return name; 
}

(async () => {
  writeLine("Racing to see who wins...");

  try {
    const values = await Promise.all([
      someDay('red'),
      someDay('green'),
      someDay('blue'),
      someDay('yellow'),
      someDay('black'),
      someDay('white'),
    ]);

    // We'll get an array populated with whatever each
    // promise function returned.  If any of these throws
    // an exception then Promise.all() will return undefined.
    console.log(values);

    writeLine(`All completed successfully!`);
  } catch (err) {
    writeLine(`OOPS! ${err.message} threw an exception!`);
  }
})();