// ----------- HELPERS -----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  let solution = "hello world";
  return solution;
};

// ----------- CONTROLLER -------------------
const solveProblem = problem => {
  // iterate over testcases
  let lineStart = 0;
  for (let t = 0; t < problem.T; t++) {
    let E = problem.testCases[lineStart][0];
    let currTestCase;

    currTestCase = [];
    for (let l = 0; l <= E; l++) {
      currTestCase.push(problem.testCases[lineStart + l]);
    }

    // solve each case in main logic function
    const solution = solveTestCase(currTestCase, t, problem.T);
    lineStart = lineStart + E + 1;
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

readInput();

// analysis:
// immutable objects annoying in js. extra overhead and possible bugs
// 