const LINES_PER_CASE = 3;
const KEYS = ["C","M","Y","K"]

// ----------- HELPERS -----------------
const sum = (arr) => {
  let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}
const sortObjects = (arr = [], {key, order} = {key: "id", order: "desc"}) => {
  return arr.sort((a,b) => {
    return order === "asc" ? a[key] - b[key] : b[key] - a[key]
  })
}
// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const CONDITION = Math.pow(10,6)
  // create minPrinter
  // create store as mini database
  let store = {}
  dataSet[0].forEach((el, i) => {
    store[KEYS[i]] = {
      id: i,
      key: KEYS[i],
      value: Math.min(dataSet[0][i],dataSet[1][i],dataSet[2][i]),
      solution: 0
    }
  })
  // create array of objects to sort and filter
  const sortable = Object.keys(store).map(el => store[el])

  // calculate if total ink in printer is enough
  if(sum(sortable.map(el => el.value)) < CONDITION) return " IMPOSSIBLE"

  // sort
  const sorted = sortObjects(sortable, {key: "value", order:"desc"})

  // if enough ink, iterate cartridges until answer is found
  let solved = false
  let i = 0
  let subTotal = 0
  while (solved === false && i< sortable.length) {
    // check if subtotal + curCar meets target
    // if true, set curCar solution and return answer
    // if false, set curCar solution to value and continue
    if (subTotal + sorted[i].value >= CONDITION) {
      store = {
        ...store,
        [sorted[i].key] : {
          ...store[sorted[i].key],
          solution: CONDITION-subTotal
        }
      }
      solved = true
    } else {
      store = {
        ...store,
        [sorted[i].key] : {
          ...store[sorted[i].key],
          solution: sorted[i].value
        }
      }
      subTotal = subTotal + sorted[i].value
      i++
    }
  }
  let solution = "";
  KEYS.forEach(key => {
    solution = solution + ` ${store[key].solution}`
  })
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
    t !== 0 && process.stdout.write('\n');
    process.stdout.write(`Case #${t + 1}: `);
    process.stdout.write(solution);
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