// algorithm ---------------
const punchCard = (R, C) => {
  const components = ["..","+-","|.","+","|"];
  
  const createCharLine = (isBorder) => {
    const charLine = [];
    for (let u=0; u<C; u++) {
      charLine.push(components[isBorder ? 1 : 2]);
      if (u === C-1) {
      charLine.push(components[isBorder ? 3 : 4]);
      }
    }

    return charLine.join("");
  };

  //create border and cellLine
  let borderLine = createCharLine(true);
  let cellLine = createCharLine(false);

  // create card by repeating border and cellline
  let card = "";
  card = card + borderLine.replace(components[1],components[0]) + "\n";
  card = card + cellLine.replace(components[2],components[0]) + "\n";

  for (let i=1;i<R;i++) {
    card = card + borderLine + "\n";
    card = card + cellLine  + "\n";
  }
    card = card + borderLine;
    return card;
}

// main -------------------
const solveProblem = (problem) => {
  const numCases = problem.T
  let currCase = 1;
  for (let testCase of problem.testCases) {
    process.stdout.write(`Case #${currCase}:\n`);
    const card = punchCard(testCase[0],testCase[1]);
    process.stdout.write(card.trim());
    currCase += 1;
    if (currCase < numCases + 1) process.stdout.write("\n")
  }

}


// read input
function readInput() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  let problem = {
    T: 0,
    testCases: []
  };

  rl.on('line', function (line) {
    // TODO: Process input
    if (problem.T === 0) {
      // Get number of test cases from first line
      problem.T = Number(line);
    } else {
      // TODO process the rest of the data
      const [a, b] = line.split(' ');
      const aNum = Number(a);
      const bNum = Number(b);

      problem.testCases.push([aNum, bNum]);
    }
  })

  .on('close', () => {
    // Finished processing input, now solve question
    solveProblem(problem);
    process.exit();
  })
}

readInput()

// difficulty online competition: 3% failed, 94% passed
// status: solved
/* analysis: 
---- wasted a lot of time trying to read the input. solution: found template to use for future challenges
---- solved problem relatively quickly, wasted time trying to optimize. solution: build mvp. then optionally optimize.
---- struggled with basic javascript limitations. like array.join() for string concatenation that didn't work. solution: practise basic js. or use python.
---- made it more difficult than necesssary, because i didn't read the briefing precizely enough (R and C > 1). lesson: read briefing carefully and write down interpretation.
---- stuck in debugging online without error messages. solution: debug locally with $ node script.js < input.txt
---- after having the right solution, stuck in debugging for a long time because of dyslectic typo (Case #:1 instead of Case #1:) and/or trailing empty line. (console.log instead of process.stdout.write). solution manual careful review.
*/