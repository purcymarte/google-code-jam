const LINES_PER_CASE = 3;

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const [[N],F,P] = dataSet
  const children = Array.from(Array(N), ()=>[])
  for (let i = 0; i < N; i++) {
    if (P[i]<1) continue
    children[P[i]-1].push(i);
  }

  let total = 0
  const chain = Array(N);

  // reverse iterate to start at leafs
  for (let node = N-1; node >= 0; node--) {
    if (!children[node].length) {
      chain[node] = F[node]
      continue
    }

    const childFun = []
    for (let child of children[node]) {
      childFun.push(chain[child])
    }
    chain[node] = Math.max(F[node],childFun.sort((a,b)=> b-a).pop())
    for (let fun of childFun) {
      total += fun
    }
  }

  // iterate over roots to add remaining chains
  for (let node = 0; node < N; node++) {
    if (P[node] === 0) {
      total += chain[node]
    }
  }

  return total;
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
