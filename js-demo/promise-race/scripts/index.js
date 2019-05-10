import { writeLine } from './pageConsole.js';

async function sleep(msTime) {
  return new Promise(resolve => setTimeout(resolve, msTime));
}

async function someDay(name) {
  // Sleep between 1 and 5 seconds
  const timeout = 4000 * Math.random() + 1000;
  await sleep(timeout);

  // Throw an exception 20% of the time
  if (Math.random() <= .20) {
    throw new Error(name);
  }

  // Otherwise return successfully
  writeLine(`${name} completed in ${timeout}ms.`)
  return name;
}

(async () => {
  writeLine("Racing to see who wins...");

  try {
    const winner = await Promise.race([
      someDay('red'),
      someDay('green'),
      someDay('blue'),
      someDay('yellow'),
      someDay('black'),
      someDay('white'),
    ]);

    writeLine(`Aaaaand the winner is: ${winner}`);
  } catch (err) {
    writeLine(`OOPS! ${err.message} threw an exception!`);
  }

})();