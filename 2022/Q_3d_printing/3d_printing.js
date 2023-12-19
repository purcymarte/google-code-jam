// main -------------------
const solveProblem = (problem) => {
  const numCases = problem.T;
  const testCases = problem.testCases;
  const linesPerCase = 3;
  const TOTAL_UNITS = Math.pow(10, 6);

  // solve problem here
  for (let i = 0; i < numCases; i++) {
    process.stdout.write(`${i === 0 ? "" : "\n"}Case #${i + 1}: `);
    const testCase = [
      testCases[i * linesPerCase],
      testCases[i * linesPerCase + 1],
      testCases[i * linesPerCase + 2],
    ];

    // boolean operation to get "Pmin" min. amount of ink in each printer's cartridges
    let Pmin = {
      cartridges: {
        C: Math.min(testCase[0][0], testCase[1][0], testCase[2][0]),
        M: Math.min(testCase[0][1], testCase[1][1], testCase[2][1]),
        Y: Math.min(testCase[0][2], testCase[1][2], testCase[2][2]),
        K: Math.min(testCase[0][3], testCase[1][3], testCase[2][3]),
      },
    };
    // calc total units in Pmin. if <10^6 return impossible
    Pmin.sum =
      Pmin.cartridges.C +
      Pmin.cartridges.M +
      Pmin.cartridges.Y +
      Pmin.cartridges.K;
    if (Pmin.sum < TOTAL_UNITS) {
      process.stdout.write("IMPOSSIBLE");
      continue;
    }
    Pmin.solution = {
      C: 0,
      M: 0,
      Y: 0,
      K: 0,
    };
    Pmin.printSolution = () => {
      process.stdout.write(
        `${Pmin.solution.C} ${Pmin.solution.M} ${Pmin.solution.Y} ${
          Pmin.solution.K
        }`
      );
    };
    // sort C in Pmin, desc
    Pmin.sortable = [];
    for (let cartridge in Pmin.cartridges) {
      Pmin.sortable.push([cartridge, Pmin.cartridges[cartridge]]);
    }
    Pmin.sorted = Pmin.sortable.sort((a, b) => {
      return b[1] - a[1];
    });

    // iterate C's until >=10^6 sum is reached
    Pmin.solution[Pmin.sorted[0][0]] = Pmin.sorted[0][1];
    if (Pmin.sorted[0][1] === TOTAL_UNITS) {
      Pmin.printSolution();
      continue;
    }
    if (Pmin.sorted[0][1] + Pmin.sorted[1][1] >= TOTAL_UNITS) {
      Pmin.solution[Pmin.sorted[1][0]] =
        TOTAL_UNITS - Pmin.solution[Pmin.sorted[0][0]];
      Pmin.printSolution();
      continue;
    } else {
      Pmin.solution[Pmin.sorted[1][0]] = Pmin.sorted[1][1];
    }
    if (
      Pmin.sorted[0][1] + Pmin.sorted[1][1] + Pmin.sorted[2][1] >=
      TOTAL_UNITS
    ) {
      Pmin.solution[Pmin.sorted[2][0]] =
        TOTAL_UNITS -
        Pmin.solution[Pmin.sorted[0][0]] -
        Pmin.solution[Pmin.sorted[1][0]];
      Pmin.printSolution();
      continue;
    } else {
      Pmin.solution[Pmin.sorted[2][0]] = Pmin.sorted[2][1];
    }
    Pmin.solution[Pmin.sorted[3][0]] =
      TOTAL_UNITS -
      Pmin.solution[Pmin.sorted[0][0]] -
      Pmin.solution[Pmin.sorted[1][0]] -
      Pmin.solution[Pmin.sorted[2][0]];
    Pmin.printSolution();
    continue;
  }
};

// read input
function readInput() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let problem = {
    T: 0,
    testCases: [],
  };

  rl.on("line", function(line) {
    // Process input
    if (problem.T === 0) {
      // Get number of test cases from first line
      problem.T = Number(line);
    } else {
      // Process the rest of the data
      const lineItems = line.split(" ");
      let numList = [];
      for (let lineItem of lineItems) {
        const numItem = Number(lineItem);
        numList.push(numItem);
      }
      problem.testCases.push(numList);
    }
  }).on("close", () => {
    // Finished processing input, now solve question
    solveProblem(problem);
    process.exit();
  });
}

readInput();

// difficulty online competition: 4% failed, 77% passed
// status: solved
/* analysis
---- process went much better than previous challenge. more structured.
---- briefing and problem solving part fine, could be a bit faster
---- coding part took way too long. improve sublime skills. improve basic js object and array manipulation skills. (converting obj<> arr, sorting, filtering,). improve Math.methods knowledge.
---- solution failed first time. bug could have been spotted by manually checking the output for the conditions.
*/
