const LINES_PER_CASE = 3;

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
      for (let k = 0; k < dataSet[i].length; k++) {
        _arr.push(Math.min(C[i][j - 1][k], dataSet[j][k]));
      }
      C[i][j] = _arr;
    }
  }
  console.log("C", C)

  // create dp matrix
  const dp = []
  for (let i = 0; i < E; i++) {
      dp[i] = []
  }

  const recur = (l,r) => {
  	console.log("checking for", l, r)
    // if (dp[l][r]) return dp[l][r]
    if (l == r) {
        dp[l][r] = 0
        return dp[l][r]
    }

    const options = []
    for (let x = l; x < r; x++) {
        //iteratable code
        const option = recur(l,x) + 2 * (sum(C[l][x])-sum(C[l][r])) +
        recur(x+1,r) + 2 * (sum(C[x+1][r])-sum(C[l][r]))
        options.push(option)
    }
    console.log("options", options)
    dp[l][r] = Math.min(...options)
    console.log("returning,", dp[l][r])
    return dp[l][r]
  }
  recur(0,E-1)
  console.log("dp", dp);
  return dp[0][E-1];
};

// ----------- CONTROLLER -------------------
const solveProblem = problem => {
  // iterate over testcases
  let lineStart = 0;
  for (let t = 0; t < problem.T; t++) {
    let E = problem.testCases[lineStart][0];
    let currTestCase;
    if (LINES_PER_CASE === 1) {
      currTestCase = problem.testCases[t];
    } else {
      currTestCase = [];
      for (let l = 0; l <= E; l++) {
        currTestCase.push(problem.testCases[lineStart + l]);
      }
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
