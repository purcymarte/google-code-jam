const LINES_PER_CASE = 2;

// ----------- HELPERS -----------------
const test = string => {
  const present = [];
  for (let i = 0; i < string.length; i++) {
    if (i !== 0 && string[i] === string[i - 1]) continue;
    if (present.includes(string[i])) return false;
    present.push(string[i]);
  }
  return true;
};
// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const N = Number(dataSet[0]);
  const towers = new Array(N + 1);
  towers[0] = dataSet[1];

  const combineTowers = n => {
    for (let i = 0; i < towers[n - 1].length; i++) {
      //iteratable code
      const result = test(towers[n - 1][i]);
      if (result) {
        console.log(result, towers[n-1][i])
        towers[n].push(towers);
      }
    }
  };
  // test each word
  for (let i = 0; i < towers[0]; i++) {
    if (!test(towers[0][i])) return 'IMPOSSIBLE';
  }
  // group single letter words
  for (let i = 0; i < towers[0]; i++) {
    //iteratable code
  }
  console.log("words validated")
  //BUG: overlap and replicates in next level

  // now that each towers is valid..
  // start combining towers until N towers

  for (let i = 1; i < 3; i++) {
    towers[i] = [];
    for (let j = 0; j < towers[i - 1].length; j++) {
      //for each tower on previous level
      for (let k = 0; k < towers[i - 1].length; k++) {
        // try to combine with each other tower
        if (j === k) continue;
        const superTower = towers[i - 1][j].concat(towers[i - 1][k]);
        // console.log(superTower)
        if (test(superTower)) towers[i].push(superTower);
      }
    }
    if (!towers[i].length) return 'IMPOSSIBLE';
  }
  console.log(towers)
  let solution = towers[N - 1];
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
      let list = [];
      for (let lineItem of lineItems) {
        list.push(lineItem);
      }
      problem.testCases.push(list);
    }
  }).on('close', () => {
    // Finished processing input, now solve question
    solveProblem(problem);
    process.exit();
  });
}

readInput();
