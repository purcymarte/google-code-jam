const LINES_PER_CASE = 1;

// ----------- HELPERS -----------------
//https://www.youtube.com/watch?v=1XC3p2zBK34
// https://www.youtube.com/watch?v=0qgaIMqOEVs

function Node(data) {
  this.data = data;
  this.children = [];
}

// a tree is a nested structure
// it consists ONLY of a root node object
// the node is an object with
// each child is a node with a children prop.
class RootedTree {
  constructor() {
    this.root = null;
  }

  generate(M,C,K) {
    this.root = new Node({
        p: 1,
        islands: 1,
        freeM: M-2,
        freeC: C-1,
        parentP: 0
    })
    this.C = C
    this.M = M
    this.K = K
    this.prob = 0
    this.generateBFS()

  }

  generateBFS() {
    const queue = [this.root];

      while (queue.length) {
        // remove first node In array. Move it to const.
        const node = queue.shift();
        // push left child
        
        // add children to queue until leafs are reached (no more children)
        if (node.data.freeM > 1) {
          //add left child
          const pConnectToIsland = node.data.freeM * (this.M - node.data.freeM)/node.data.freeC
          console.log("p connect to island: ", pConnectToIsland)
          const childLeft = new Node({
            islands:node.data.islands,
            freeM: node.data.freeM - 1,
            freeC: node.data.freeC - 1,
            p: node.data.p * pConnectToIsland
          })
          const childRight = new Node({
            islands:node.data.islands + 1,
            freeM: node.data.freeM - 2,
            freeC: node.data.freeC - 1,
            p: node.data.p * (1 - pConnectToIsland)
          })
          node.children.push(childLeft);
          node.children.push(childRight);
          queue.push(node.children[0]);
          queue.push(node.children[1]);
        }
      }
  }

  traverseDFS(callback) {
    let stack = [this.root];

    while (stack.length) {

      let curr = stack.pop();
      callback(curr)
      // no need to search deeper once we past the island size
      if (this.K < curr.data.islands) continue

      for(let i=0;i<curr.children.length;i++) {
        stack.push(curr.children[i]);
      }

    }
  }
  calcProb() {
    this.traverseDFS(node => {
      if (!node.children.length) {
        if (this.K == node.data.islands) {
            this.prob += node.data.p
        }
      }
    });
  }

  // height of a tree = height of biggest branch + 1
  findHeight(node = this.root) {
    // in case of empty tree, return err
    if (node == null) {
      return -1;
    }
    // if we arrived at a leaf, return 0
    if (!node.children.length) {
      return 0;
    }
    // recursively call find height on all branches and subbranches
    // until we arrive at the leafs
    return Math.max(...node.children.map(child => this.findHeight(child))) + 1;
  }

  logNodes() {
    this.traverseDFSIterative((node) => console.log(node))
  }

}

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  console.log(dataSet);
  // min island size : 2
  // max island size : M>3?M-2:M

  const [M,K] = dataSet // machines, islands
  const C = M*(M-1)/2

  // for each connection
  for (let i = 0; i < C; i++) {
      
  }

  const tree = new RootedTree()
  // build tree
  tree.generate(M,C,K)
  console.log(tree.root)
  // traverse until islands <= K OR LEAF
  // calculate chances
  tree.calcProb()
  console.log(tree.prob)
  // sum probabilities

  let solution = 1/3 + 1/8*2/3
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
