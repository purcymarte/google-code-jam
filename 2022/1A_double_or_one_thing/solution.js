const LINES_PER_CASE = 1;

// ----------- HELPERS -----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  let queue = [...dataSet];
  const highestFollower = new Array(dataSet.length);
  const nonSimilarFollowerIsHigher = new Array(dataSet.length);

  for (let i = 0; i < dataSet.length; i++) {
    if (i === 0) {
      highestFollower[dataSet.length - 1] = null;
      nonSimilarFollowerIsHigher[dataSet.length - 1] = false;
      continue;
    }
    const lastItem = queue.pop();
    const highest =
      lastItem < highestFollower[dataSet.length - i]
        ? highestFollower[dataSet.length - i]
        : lastItem;
    highestFollower[dataSet.length - (i + 1)] = highest;
    if (lastItem == dataSet[dataSet.length - (i+1)]) {
        nonSimilarFollowerIsHigher[dataSet.length - (i + 1)] = nonSimilarFollowerIsHigher[dataSet.length - i];
    }
    if (dataSet[dataSet.length - (i+1)] < lastItem) {
        nonSimilarFollowerIsHigher[dataSet.length - (i + 1)] = true
    }
  }
  let solution = [];
  for (let i = 0; i < dataSet.length; i++) {
    if (i !== dataSet[i] - 1 && dataSet[i] <= dataSet[i + 1] && dataSet[i] < highestFollower[i] && nonSimilarFollowerIsHigher[i]) {
      solution.push(dataSet[i]);
    }
    solution.push(dataSet[i]);
  }

  return solution.join('');
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
      // const lineItems = line.split(' ');
      // let numList = [];
      // for (let lineItem of lineItems) {
      //   const numItem = Number(lineItem);
      //   numList.push(numItem);
      // }
      problem.testCases.push(line);
    }
  }).on('close', () => {
    // Finished processing input, now solve question
    solveProblem(problem);
    process.exit();
  });
}

readInput();

// analysis:
// immutable objects annoying in js. extra overhead and possible bugs
//
