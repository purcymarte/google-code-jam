// ----------- HELPERS -----------------
// [ <1 empty item>, [ 10, 40 ], [ 20, 60 ], [ 50, 60 ] ]
// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = (dataSet, caseProps) => {
  const [N, P] = caseProps;
  dataSet;

  const X = new Array(N+1);
  // define min and max product for each customer
  for (let i = 0; i < N; i++) {
    X[i+1] = [Math.min(...dataSet[i]), Math.max(...dataSet[i])];
  }

  // order Xn depends on Xn+1, depends on Xn+2, ...
  // order X0 is defined
  // 1000 deep recursion is no problem

  // best order for n is fewest pushes for
  // n-1[last] n[0,1] to n+1[furthest] OR n-1[last] n[1,0] to n+1[furthest]
  const dp = new Array(N+1);
  let l
  for (let i = 0; i < dp.length; i++) {
    if (i == 0) {
      dp[0] = [0, 0]; // [if asc, if desc]
      l = [0, 0];
      continue;
    }

    //else
    dp[i] = [];
    // in case of asc:
    dp[i][0] = Math.min(
      dp[i - 1][0] + Math.abs(l[0] - X[i][0]) + (X[i][1] - X[i][0]),
      dp[i - 1][1] + Math.abs(l[1] - X[i][0]) + (X[i][1] - X[i][0]) 
    );
    // in case of desc
    dp[i][1] = Math.min(
      dp[i - 1][0] + Math.abs(l[0] - X[i][1]) + (X[i][1] - X[i][0]),
      dp[i - 1][1] + Math.abs(l[1] - X[i][1]) + (X[i][1] - X[i][0]) 
    );

    // update last pressure for both cases
    l[0] = X[i][1]; //fixed: stored incorrect l value (min instead of max)
    l[1] = X[i][0];

  }

  let solution = Math.min(dp[N][0],dp[N][1]);
  return solution;
};

// ----------- CONTROLLER -------------------
const solveProblem = problem => {
  // iterate over testcases
  let lineStart = 0;
  for (let t = 0; t < problem.T; t++) {
    const caseBoundaries = problem.testCases[lineStart];
    let E = caseBoundaries[0];
    const currTestCase = [];
    for (let l = 1; l <= E; l++) {
      currTestCase.push(problem.testCases[lineStart + l]);
    }

    // solve each case in main logic function
    const solution = solveTestCase(currTestCase, caseBoundaries);
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
// very close to correct solution (samples passed)
// i found the key observation: only min and max per customer matters
// i realised the complexity O(2^6) is too large for the big set
// i assumed that dynamic programming would be needed
// i did not find the correct dp technique