// utils
const sum = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

const sortObjects = (
  arr = [],
  { key, order } = { key: 'id', order: 'desc' }
) => {
  return arr.sort((a, b) => {
    return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
  });
};

// main -------------------
const solveProblem = problem => {
  const numCases = problem.T;
  const testCases = problem.testCases;
  const linesPerCase = 3;
  const impossible = ' IMPOSSIBLE';
  const TOTAL_UNITS = Math.pow(10, 6);

  // solve problem here
  for (let i = 0; i < numCases; i++) {
    if (i !== 0) {
      process.stdout.write('\n');
    }
    process.stdout.write(`Case #${i + 1}:`);

    // get case input
    const curCase = [
      testCases[i * 3],
      testCases[i * 3 + 1],
      testCases[i * 3 + 2],
    ];
    // get Pmin
    let Pmin = [];
    for (let i = 0; i < 4; i++) {
      const keys = ['c', 'm', 'y', 'k'];
      Pmin.push({
        id: i,
        key: keys[i],
        fill: Math.min(curCase[0][i], curCase[1][i], curCase[2][i]),
        solution: 0,
      });
    }
    // calc total fill
    const fills = Pmin.map(e => e.fill);
    const totalFill = sum(fills);
    if (totalFill < TOTAL_UNITS) {
      process.stdout.write(impossible);
      continue;
    }

    // sort desc
    Pmin = [...sortObjects(Pmin, { key: 'fill', order: 'desc' })];
    // iteratate colors find answer
    let solved = false;
    let u = 0;
    let subTotal = 0;
    while (solved === false) {
      if (subTotal + Pmin[u].fill >= TOTAL_UNITS) {
        // if target is reached. solution of this cartridge
        // is total_units - subtotal of cartridges so far
        Pmin[u].solution = TOTAL_UNITS - subTotal;
        solved = true;
        continue;
      }
      // else, solution of this cartridge is the entire fill
      Pmin[u].solution = Pmin[u].fill;
      subTotal = subTotal + Pmin[u].fill;
      u++;
    }
    // now that puzzle is solved, return answer
    // sort back to original order (by id)
    Pmin = [...sortObjects(Pmin, { key: 'id', order: 'asc' })];
    for (let e of Pmin) {
      process.stdout.write(` ${e.solution}`);
    }
  }
};

// read input
function readInput() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let problem = {
    T: 0,
    testCases: [],
  };

  rl.on('line', function(line) {
    // Process input
    if (problem.T === 0) {
      // Get number of test cases from first line
      problem.T = Number(line);
    } else {
      // Process the rest of the data
      const lineItems = line.split(' ');
      let numList = [];
      for (let lineItem of lineItems) {
        const numItem = Number(lineItem);
        numList.push(numItem);
      }
      problem.testCases.push(numList);
    }
  }).on('close', () => {
    // Finished processing input, now solve question
    solveProblem(problem);
    process.exit();
  });
}

readInput();
