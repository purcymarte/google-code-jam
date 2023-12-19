const LINES_PER_CASE = 2;

// ----------- HELPERS -----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const [N, D] = dataSet;
  // T [2-10^5], D [2-10^5]
  // given an ordered 2-sided queue
  // how often can we maximally pick Di>=Dmax
  // observation: Dmax start = 0
  // observation: if Dmax(sum(D0-Dn-1)) is lower than Dn, we have a pay
  // observation: if one of 2 options < Dmax, it will never yield pay, best to get rid of it
  // strategy: if (Da<Dmax) -> pick
  // strategy: if (Db<Dmax) -> pick
  // strategy: if equal, prefer Db, because pop is cheaper
  // heuristic popping and shifting should be O(n)?
  let Dmax = 0;
  let paid = 0;
  for (let i = 0; i < N; i++) {
    if (D[D.length - 1] < Dmax) {
      D.pop();
      continue;
    }
    if (D[0] < Dmax) {
      D.shift();
      continue;
    }
    if (D[D.length - 1] <= D[0]) {
      cur = D.pop();
    } else {
      cur = D.shift();
    }
    if (cur >= Dmax) {
      paid += 1;
      Dmax = Math.max(Dmax, cur);
    }
  }
  return paid;
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

readInput();
