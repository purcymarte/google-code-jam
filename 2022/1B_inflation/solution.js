// ----------- HELPERS -----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = (dataSet, caseProps) => {
  const [N,P] = caseProps
  dataSet

  const X = new Array(N)
  // define min and max product for each customer
  for (let i = 0; i < N; i++) {
    X[i] = [Math.min(...dataSet[i]),Math.max(...dataSet[i])]
  }

  // order Xn depends on Xn+1, depends on Xn+2, ...
  // order X0 is defined
  // 1000 deep recursion is no problem

  // best order for n is fewest pushes for
  // n-1[last] n[0,1] to n+1[furthest] OR n-1[last] n[1,0] to n+1[furthest]
  let pushes = 0
  for (let i = 0; i < N; i++) {
    if (i == 0) {
      pushes += X[i][1]
      continue
    }
    if (i == N-1) {
      if (Math.abs(X[i-1][1]-X[i][1]) < Math.abs(X[i-1][1]-X[i][0])) {
        X[i] = [X[i][1], X[i][0]]
      }
      pushes += Math.abs(X[i-1][1]-X[i][0])
      pushes += Math.abs(X[i][0]-X[i][1])
      continue
    }
    // diff prev last to cur first
    const a = Math.abs(X[i-1][1]-X[i][0]) +
    // + diff cur first to cur last
    Math.abs(X[i][0]-X[i][1]) +
    // + max diff cur last to 
    Math.max(Math.abs(X[i][1]-X[i+1][0]),Math.abs(X[i][1]-X[i+1][1]))
    const b = Math.abs(X[i-1][1]-X[i][1]) +
    Math.abs(X[i][0]-X[i][1]) +
    Math.max(Math.abs(X[i][0]-X[i+1][0]),Math.abs(X[i][0]-X[i+1][1]))
    if (b < a) {
      X[i] = [X[i][1], X[i][0]]
    }
    pushes += Math.abs(X[i-1][1]-X[i][0])
    pushes += Math.abs(X[i][0]-X[i][1])
  }

//   order is defined by n min,n max, n-1 last, n+1 min, n+1 max
// orderA: diff(n-1 last, n min) + diff(n min,n max) + math.min(diff(n max,n+1 min),diff(n max,n+1 max))
// orderB: diff(n-1 last, n max) + diff(n min,n max) + math.min(diff(n min,n+1 min),diff(n min,n+1 max))
// pick order with least presses
  // given order of N customers 
  // for each customer, choose any order of P products, 
  // with target pressure Pi
  // pump init = 0
  // press + or - to adjust pump pressure
  // what is minimum number of button presses needed?
  /* OBSERVATIONS:
  - Any customer has a product that is furthest away from pump pressure
  - Only highest and lowest number matter
  - Any product on the way there will be passed anyway
  - DIFF or DELTA is what counts
  - It's possible that a customer has products that are both higher
  - and lower than previous furthest.
  - It makes no sense, to have > 2 pivots per customer
  - delta P
    STRATEGY:

  */
  let solution = pushes
  return solution;
};

// ----------- CONTROLLER -------------------
const solveProblem = problem => {
  // iterate over testcases
  let lineStart = 0;
  for (let t = 0; t < problem.T; t++) {
    const caseBoundaries = problem.testCases[lineStart]
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
// very close to correct solution
// i found the key observation: only min and max per customer matters
// i realised the complexity O(2^6) is too large for the big set
// i assumed that dynamic programming would be needed

// I missed the correct dynamic programming approach:
// track `pumpLevel` and `minPumps` for TWO options per customer
// option1: customer ordered first min, then max
// option2: customer ordered first max, then min
// the values of both pumpLevel and totalpumps are stored in 
// 2bit array.
// starting with value 0, you can calculate the values for the
// next customer
