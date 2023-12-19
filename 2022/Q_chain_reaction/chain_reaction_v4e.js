"use strict";

const LINES_PER_CASE = 3;

// ----------- HELPERS -----------------
const trampoline = fn => (...args) => {
  let result = fn(...args);
  //repeatedly call the function till you hit your base case
  while (typeof result === 'function') {
    result = result();
  }
  return result;
};

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
  constructor(N, F, P) {
    this.root = new Node(0);
    this.total = 0;
    this.N = N;
    this.F = F;
    this.P = P;
  }
  generate(N, F, P) {
    //create children recursively
    // add root to arrays (hacky way)
    F.unshift(null);
    P.unshift(null);
    const hashTable = Object.create(null);
    // add all modules to hashtable
    for (let i = 0; i <= N; i++) {
      // if root assign id:0
      hashTable[i] = {
        id: i,
        F: F[i],
        children: [],
      };
    }
    // console.log(hashTable)
    // add children to hash table
    // when root is found, add to dataTree
    const dataTree = [];
    for (let i = 0; i <= N; i++) {
      // console.log(i, "node", hashTable[i], "parent", P[i])
      if (P[i] !== null) hashTable[P[i]].children.push(hashTable[i]);
      else dataTree.push(hashTable[i]);
    }
    const [root] = dataTree;
    this.root = root;
  }

  // note: replacing map with for does not improve performance
  findChildren(node) {
    // find ids of its children
    const childIds = indicesOf(this.P, node.id);
    // if leaf (no children), return null
    if (!childIds.length) {
      return null;
    }

    // for each childId
    const _c = [];
    for (let i = 0; i < childIds.length; i++) {
      // create child
      const child = new Node(
        childIds[i] + 1,
        this.F[childIds[i]],
        this.P[childIds[i]]
      );
      child.children = this.findChildren(child);
      _c.push(child);
    }
    return _c;
  }

  findFun(node = this.root) {
    // returns fun of children: [maxOnChain, sumTerminated]
    const childFun = node => {
      // if node is a leaf, return array with real values
      if (!node.children || !node.children.length) {
        return [node.F, 0];
      }
      // if node is not a leaf,
      // recursively find childFun of each child
      // todo: fix stack overflow

      // childFun is a function that finds ChildFun for each child
      // it returns an array of arrays
      // [[maxOnChain, sumTerminated][maxOnChain, sumTerminated]]

      // return fun array with active chain and sum of terminated chains
      const childFunMap = node.children.map(child => {
        return childFun(child);
      });

      // sort children by lowest maxOnChain fun.
      childFunMap.sort((a, b) => a[0] - b[0]);

      let sumTerminated = 0;
      let maxOnChain;

      childFunMap.forEach((child, i) => {
        sumTerminated += child[1];
        if (i === 0) {
          // pick chain with lowest fun to remain active
          maxOnChain = Math.max(child[0], node.F);
        } else {
          // terminate all other chain
          sumTerminated += child[0];
        }
      });
      return [maxOnChain, sumTerminated];
    };

    // var t = trampoline(childFun);
    // const result = t(node);
    const result = childFun(node);
    return sum(result);
  }
}

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const tree = new Tree(dataSet[0], dataSet[1], dataSet[2]);
  // create tree
  tree.generate(dataSet[0], dataSet[1], dataSet[2]);

  // recursively calculate max fun of subbranch
  let solution = tree.findFun();
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
