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
    this.F = null
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

    // search for index in P with node.id
    // this is a child. create child. repeat process for child
  }

  findFun(node = this.root) {
    // if (this.F[node.id]) return this.F[node.id]
    if (!node.children || !node.children.length) return node.fun;

    // consider # children
    // pop maxFun of least fun child
    // create array with maxFun of children
    // shift lowest entry
    // replace lowest entry with max(lowEntry, node.fun)
    const childFun = node.children.map(child => this.findFun(child));
    // if we are at the root, return the total fun
    if (node.id === 0 ) {
      this.total += sum(childFun)
      return
    }
    // else, replace the lowest entry, with the max entry
    // terminate any other entry
    // console.log(childFun)
    childFun.sort((a, b) => a - b);
    // sum everything except lowest
    const lowFun = childFun.shift();
    this.F[node.id] = Math.max(lowFun, node.fun)
    this.total += sum(childFun)
    return this.F[node.id]
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
  console.log("total", tree.total)
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
