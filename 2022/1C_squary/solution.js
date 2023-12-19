const LINES_PER_CASE = 2;

// ----------- HELPERS -----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const [N,K] = dataSet[0]
  const E = dataSet[1]

  //

  // possible in k if
  // - diff can be 0 in k

  // when can diff never be zero?
  // - if diff is uneven

  const substract = (Ei, {curLength, diff}) => {
    const _set = {
      curLength: curLength + Ei,
      diff: diff - (2*(-Ei*(curLength+Ei)) + 2*Math.pow(Ei,2))
    }
    return _set
  }
  const add = (Ei, {curLength, diff}) =>{
    const _set = {
      curLength: curLength + Ei,
      diff: diff + 2*Ei*curLength
    }
    return _set
  }

  let set = {
    curLength: E[0],
    diff: 0
  }

  for (let i = 1; i < E.length; i++) {
    // console.log(set,E[i])
    if (E[i]<0) {
      set = substract(E[i],set)
      continue
    }
    set = add(E[i],set)
  }

  if (set.diff%2) return "IMPOSSIBLE" // only possible if diff is even
  
  // testset 1
  const findX = (set, newDiff=0) => {
    if (newDiff-set.diff===0 && set.curLength === 0) {
      return 1
    }
    return (newDiff-set.diff)/(2*set.curLength)
  }

  let solution = findX(set);
  if (solution > Math.pow(10,18) || solution < -Math.pow(10,18)) return "IMPOSSIBLE"
  if (solution === undefined || typeof solution !== "number") return "IMPOSSIBLE" // divide by zero
  // test int
  const trunc = (float) => Math.trunc(float)
  // if (trunc(solution) !== solution) return "IMPOSSIBLE"

  // test set 2
  // if solution !int or !<10^8
  // what newDiff can we find that is closer to 0?

  // in other words: how to bring solution decimals closer to 0
  // can we describe diff in terms of curLength? then there is a direct solution

  console.log(set.diff,set.curLength, Math.abs(set.diff-set.curLength)/set.curLength)
  return solution;
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
