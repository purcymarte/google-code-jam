const LINES_PER_CASE = 2;

// ----------- HELPERS ----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  let straight = 0;
  // sort asc
  const N = dataSet[0];
  let sorted = dataSet[1].sort((a, b) => b - a);
  // iterate
  for (let p = 1; p <= N; p++) {
    // for each place in straight
    // check if there is a dice left to fill it
    let positionFilled = false;
    while (sorted.length > 0 && positionFilled === false) {
      if (sorted[sorted.length-1] >= p) {
        sorted.pop();
        straight = straight + 1;
        positionFilled = true;
      } else {
        sorted.pop();
      }
    }
    if (sorted.length < 1) {
      // when array is empty, return the straight
      return straight.toString();
    }
  }
};

// ----------- CONTROLLER -------------------
const solveProblem = problem => {
  // iterate over testcases
  for (let t = 0; t < problem.T; t++) {
    let currTestCase;
    if (LINES_PER_CASE === 1) {
      currTestCase = problem.testCases[t];
    } else {
      currTestCase = [];
      for (let l = 0; l < LINES_PER_CASE; l++) {
        currTestCase.push(problem.testCases[t * LINES_PER_CASE + l]);
      }
    }

    // solve each case in main logic function
    const solution = solveTestCase(currTestCase, t, problem.T);

    // print answer in correct formatting
    process.stdout.write(`Case #${t + 1}: ${solution}\n`);
  }
  return;
};

// ----------- READ INPUT -------------------
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
console.time()
readInput();
console.timeEnd()

// analysis:
// immutable objects annoying in js. extra overhead and possible bugs
//
