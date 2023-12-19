const LINES_PER_CASE = 2;

// ----------- HELPERS -----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const N = Number(dataSet[0]);

  // const combineTowers = n => {
  //   for (let i = 0; i < towers[n - 1].length; i++) {
  //     //iteratable code
  //     const result = test(towers[n - 1][i]);
  //     if (result) {
  //       console.log(result, towers[n - 1][i]);
  //       towers[n].push(towers);
  //     }
  //   }
  // };
  // analyse each word
  const dp = []
  for (let i = 0; i < dataSet[1].length; i++) {
    const string = dataSet[1][i];
    let open = ""
    const closed = [];
    let first = ""
    let singleLetter = true
    for (let j = 0; j < string.length; j++) {
      if (j == 0) first = string[j]
      if (j !== 0 && string[j] === string[j - 1]) continue;
      singleLetter = false
      if (closed.includes(string[j])) return 'IMPOSSIBLE';
      if (j !== 0) {
        closed.push(open);
      }
      open = string[j];
    }
    dp.push({
      ids: [i],
      first: first,
      last: open,
      closed: closed,
      letters: [...closed, open],
      singleLetter: singleLetter
    });
  }
  // sort by number of closed letters
  dp.sort((a,b)=> b.closed.length - a.closed.length)
  // console.log(dp)

  for (let i = 0; i < dp.length; i++) {
    const letters = dp[i].letters
    console.log("letters", letters)
    for (let j = 0; j < dp.length; j++) {
      if (i===j) continue
      for (let k=0; k< letters.length; k++) {
        if (dp[j].letters.includes(dp[i].letters[k])) {
          console.log(dp[j].letters, "includes", [dp[i].letters[k]])
          if (dp[j].closed.includes(dp[i].letters[k])) {
            console.log("and is closed")
            if (dp[j].)
            dp[i].ancestors.push(dp[j])
            continue
          }
          //else
          dp[i]
        }
      }
    }
  }

  // join towers
  const test = (a,b) => {
    for (let i = 0; i < b.letters.length; i++) {
      if (a.closed.includes(b.letters[i])) return false
    }

  }
  // prev = []
  // towers = dp
  // N = ...
  const megaTowerEnd = (N,towers,prev) => {
    if (N==1) {
      for (let i = 0; i < towers.length; i++) {
        let totalClosed = towers.map(tower => !tower.ids.includes(i) ? tower.closed : []).flat()
        console.log("totalclosed", totalClosed)
        const closedLetters = towers[i].letters.filter(value => totalClosed.includes(value));
        // if (!closedLetters.length) return tower[i]
      }
      // towers.find(tower => {
      //   let totalClosed = towers.map(tower => tower.closed).flat()

      //   for (let i = 0; i < tower.letters; i++) {
      //     if (tower.letters[i])
      //   }
      // })
    }
  }
  // megaTowerEnd(1,dp,[])



  let solution = "test";
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

/* Analysis:
understood most of the idea, got entangled in complexity during execution.
I started a heuristics solution and then aborted because I assumed there 
should be a simpler path.
In fact, the chosen path was correct.
I just needed to continue and finetune it.
Solution is a multistep process of:
- checking individual words
- analysing words (starting and ending letters, middle letters)
- ensuring that there are no impposibilities between two words (same middle letter)
- sorting words by letters that they start and end
- iterating throught sorted words to concatenate. 
*/
