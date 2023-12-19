// ----------- HELPERS -----------------
// returns sum of array of numbers
const sum = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  let solution = dataSet;
  const [E, W] = dataSet.shift();

  // 1. Define C for all ranges,
  // exercise i until exercise j
  const C = new Array(E);

  // for each starting range
  for (let i = 0; i < E; i++) {
    // for each ending range
    for (let j = i; j < E; j++) {
      if (i == j) {
        if (!C[i]) C[i] = [];
        C[i][j] = dataSet[i];
        continue;
      }
      const _arr = [];
      // find the shared weights in this range
      // by intersecting the shared weights in range i-(j-1)
      // with the weights in this exercise
      for (let k = 0; k < dataSet[i].length; k++) {
        _arr.push(Math.min(C[i][j - 1][k], dataSet[j][k]));
      }
      C[i][j] = _arr;
    }
    for (let j = i; j < E; j++) {
      C[i][j] = sum(C[i][j]);
    }
  }

  // create dp matrix
  const dp = [];
  for (let i = 0; i < E; i++) {
    dp[i] = [];
  }

  // calculate sequences
  // increase sequence with 1 exercise to calculate
  // with known values
  for (let k = 0; k < E; k++) {
    // for all sequences with length k+1,
    // calculate dp
    for (let i = 0; i < E - k; i++) {
      // base case (sequence length: 1 exercise)
      if (k == 0) {
        dp[i][i] = 0;
        continue;
      }
      const j = i + k;

      // for any possible x
      // compute the one that requires
      // the least operations
      const subsets = [];
      for (let x = i; x < j; x++) {
        const iteration =
          dp[i][x] +
          2 * (C[i][x] - C[i][j]) +
          dp[x + 1][j] +
          2 * (C[x + 1][j] - C[i][j]);
        subsets.push(iteration);
      }
      dp[i][j] = Math.min(...subsets);
    }
  }
  return dp[0][E - 1] + 2 * C[0][E - 1];
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

/*
analysis:
difficult problem
did not find the idea. 
main idea blockade: tried to determine the position of x,
while this is impossible. what's needed is to iterate over
all options for x.
after finding the idea, difficulty implementing dp:
main dp blockade: order of filling the matrix, starting
with known values (sequence length=1).
*/