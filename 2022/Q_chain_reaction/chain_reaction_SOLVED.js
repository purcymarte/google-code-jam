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

function Node(id, fun, parentId) {
  this.id = id;
  this.fun = fun;
  this.parentId = parentId;
  this.children = [];
}

class Tree {
  constructor(N, F, P) {
    this.root = new Node(0);
    this.total = 0;
    this.N = N;
    this.F = F;
    this.P = P;
  }
  // iterative to avoid stack issues
  generate() {
    // insert abyss at the 0 index
    this.F.unshift(null);
    this.P.unshift(null);

    // create hashTable
    this.hashTable = Object.create(null);
    // add all modules to hashtable
    for (let i = 0; i <= this.N; i++) {
      this.hashTable[i] = {
        id: i,
        F: this.F[i],
        children: [],
      };
    }
    // add children to hashTable
    // when root is found, store it
    for (let i = 0; i <= this.N; i++) {
      if (this.P[i] !== null)
        this.hashTable[this.P[i]].children.push(this.hashTable[i]);
      else this.root = this.hashTable[i];
    }
  }

  // iterative to avoid stack issues
  findFun() {
    // create own stack in heap
    let stack = [this.root];
    let postOrderStack = [];

    // order nodes to move from the leafs to the root
    while (stack.length) {
      let curr = stack.pop();
      postOrderStack.push(curr);
      // add children to stack
      for (let i = 0; i < curr.children.length; i++) {
        stack.push(curr.children[i]);
      }
    }

    // traverse from the leafs to the root
    while (postOrderStack.length) {
      let curr = postOrderStack.pop();
      // store totalFun in hashTable
      // totalFun is an array consisting of:
      // activeChain, the maxFun on the on this subtree, that has not been terminated yet
      // sumTerminated, sum of maxFun on chains that have been terminated

      // if leaf, simply store:
      // - its own fun value for active chain
      // - 0 for sumTerminatedFun
      if (!curr.children || !curr.children.length) {
        this.hashTable[curr.id].maxFun = [curr.F, 0];
        continue;
      }
      // else, store:
      // max of it's lowest fun chain and its own fun value for active chain
      // sum of all chain's terminatedFun + sum of all but active chain's active chain
      // note: because we traverse the tree postOrder, we can be sure the child values have been calculated
      let maxFunOfChildren = [];
      for (let i = 0; i < curr.children.length; i++) {
        maxFunOfChildren.push(this.hashTable[curr.children[i].id].maxFun);
      }
      maxFunOfChildren.sort((a, b) => a[0] - b[0]);

      let sumTerminated = 0;
      let maxOnChain;

      maxFunOfChildren.forEach((child, i) => {
        // accumulate the fun of the terminated chains from the children
        sumTerminated += child[1];
        if (i === 0) {
          // pick chain with lowest fun to remain open
          maxOnChain = Math.max(child[0], curr.F);
        } else {
          // terminate all other open chains
          sumTerminated += child[0];
        }
      });
      // after iterating through all children,
      // store the calculated value for this subtree in the hashTable
      this.hashTable[curr.id].maxFun = [maxOnChain, sumTerminated];
    }
  }
}

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const tree = new Tree(dataSet[0], dataSet[1], dataSet[2]);
  // create tree
  tree.generate();

  // calculate max fun of subbranch
  tree.findFun();
  return sum(tree.hashTable[0].maxFun);
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
