const LINES_PER_CASE = 3;

// ----------- HELPERS -----------------
const sum = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
const sortObjects = (
  arr = [],
  { key, order } = { key: 'id', order: 'desc' }
) => {
  return arr.sort((a, b) => {
    return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
  });
};
const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};
// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const CONDITION = Math.pow(10, 6);
  // create minPrinter
  // create store as mini database
  let store = {};
  dataSet[1].forEach((el, i) => {
    store[i + 1] = {
      id: i + 1,
      fun: dataSet[1][i],
      pointer: dataSet[2][i],
    };
  });
  // create array of objects to sort and filter
  const sortable = Object.keys(store).map(el => store[el]);

  // find initiators
  const pointers = sortable.map(el => el.pointer); //todo: make unique
  const ids = sortable.map(el => el.id);
  const initiators = ids.filter(id => !pointers.includes(id));

  let maxTotalFun = 0;

  // for each order:
  let permutations = permutator(initiators);
  for (let permutation of permutations) {
    let totalFun = 0;
    let visited = [];
    permutation.forEach(initiator => {
      let maxFun = 0;
      let curId = initiator;

      while (curId !== 0 && !visited.includes(curId)) {
        maxFun = Math.max(maxFun, store[curId].fun);
        visited.push(curId);
        curId = store[curId].pointer;
      }
      // arrived at abyss or visited module
      // todo: move to next initiator
      totalFun = totalFun + maxFun;
    });
    maxTotalFun = Math.max(maxTotalFun, totalFun);
  }
  //

  let solution = maxTotalFun;
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
    const solution = solveTestCase(currTestCase);

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
