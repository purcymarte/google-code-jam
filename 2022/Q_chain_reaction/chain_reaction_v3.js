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

// indices of
// return list of all indices
const indicesOf = (arr, value) => {
  const indices = [];
  let idx = arr.indexOf(value);
  while (idx != -1) {
    indices.push(idx);
    idx = arr.indexOf(value, idx + 1);
  }
  return indices;
};

function Node(id, fun, parentId) {
  this.id = id;
  this.fun = fun;
  this.parentId = parentId;
  this.children = [];
}

class Tree {
  constructor() {
    this.root = new Node(0);
    this.total = 0
  }
  generate(F, P, [N]) {
    this.F = new Array(N+1)
    //create children recursively
    // start at root
    const findChildren = node => {
      const childIds = indicesOf(P, node.id);
      if (!childIds.length) {
        return null;
      }
      return childIds.map(childId => {
        const child = new Node(childId + 1, F[childId], P[childId]);
        return { ...child, children: findChildren(child) };
      });
    };
    this.root.children = findChildren(this.root);
  }

  findFun(node = this.root) {
    if (!node.children || !node.children.length) return node.fun;

    // recursively find fun of children
    const childFun = node.children.map(child => this.findFun(child));
    
    // if we are at the root, add fun of children
    // to total and return
    if (node.id === 0 ) {
      this.total += sum(childFun)
      return this.total
    }

    // else, terminate all paths, except for the lowest fun path
    // maximize the lowest fun path with the fun of the current node
    // and return it
    childFun.sort((a, b) => a - b);
    const lowFun = childFun.shift();
    this.total += sum(childFun)
    return Math.max(lowFun, node.fun)
  }
}

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const tree = new Tree();
  // create tree
  tree.generate(dataSet[1], dataSet[2], dataSet[1]);

  // recursively calculate max fun of subbranch
  let solution = tree.findFun()
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
