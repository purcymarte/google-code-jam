const LINES_PER_CASE = 3;

/*

        0
        |\
        1 5
       /|\
      2 3 4
   closed chain
0: 60 50 // 160
1: 
2: 0 2
3: 0 1
4: 0 4
5: 0 5
// on chain is correct. closed is incorrect for 2 on
*/

// ----------- HELPERS -----------------
//13.05 read + strategy
//13.16
// returns sum of array of numbers
const sum = (arr) => {
  let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}
// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const N = dataSet[0];
  const F = dataSet[1];
  const P = dataSet[2];

  const hashTable = Array(F.length + 1);
  // abyss is not included, add root
  hashTable[0] = {
    id: 0,
    F: 0,
    children: [],
  };
  for (let i = 0; i < F.length; i++) {
    hashTable[i + 1] = {
      // shift id 1
      id: i + 1,
      F: F[i],
      children: [],
    };
  }

  // add children
  for (let i = 0; i < P.length; i++) {
    hashTable[P[i]].children.push(hashTable[i + 1]);
  }
  const closedFun = new Array(hashTable.length)
  const chainFun = new Array(hashTable.length)

  const tree = hashTable[0]

  // dfs over tree to add properties
  const stack = [tree]
  const postOrderStack = []

  // re-order to move from leave to root
  while (stack.length) {
    const cur = stack.pop()
    postOrderStack.push(cur)
    for (let child of cur.children) {
      stack.push(child)
    }
  }

  while(postOrderStack.length) {
    const cur = postOrderStack.pop()
    // if leaf:
    if (!cur.children.length) {
      closedFun[cur.id] = 0
      chainFun[cur.id] = cur.F
      continue
    }
    // else if 1 child
    if (cur.children.length == 1) {
      closedFun[cur.id] = closedFun[cur.children[0].id]
      chainFun[cur.id] = Math.max(cur.F, chainFun[cur.children[0].id])
      continue
    }

    const childIds = []
    
    for (let child of cur.children) {
      childIds.push(child.id)
    }
    
    const _closedFun = childIds.map(id =>closedFun[id])
    const _chainFun = childIds.map(id=>chainFun[id]).sort((a,b)=>b-a)
    const minChainFun = _chainFun.pop()

    closedFun[cur.id] = sum(_closedFun) + sum(_chainFun)
    chainFun[cur.id] = Math.max(cur.F, minChainFun)
    
  }

  let solution = closedFun[0] +chainFun[0]
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
