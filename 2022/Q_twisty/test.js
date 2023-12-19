//https://github.com/ecgan/google-code-jam/blob/master/2018/1C/2-lollipop-shop/solution.js
'use strict';

//
// InteractiveCaseSolver
//
class InteractiveCaseSolver {
  constructor() {
    this.N = 0;
    this.K = 0;

    this.state = 'N';
  }

  readline(line) {
    switch (this.state) {
      case 'D': {
        const chars = line.split(' ');
        const D = parseInt(line[0]);
        const flavors = chars
          .filter((val, index) => index !== 0)
          .map(c => parseInt(c));
        this.flavors.push(flavors);

        flavors.forEach(f => {
          this.history[f] += 1;
        });
      }
    }
  }

  solve() {
    let flavors = this.flavors[this.flavors.length - 1];

    let result = chosen.flavor;
    this.sold.push(result);
    return result;
  }
}

//
// InteractiveCaseController
//
class InteractiveCaseController {
  constructor(caseId) {
    this.caseId = caseId;
    this.N = 0; // number chunks to expect
    this.K = 0; // number of operationsAllowed
    this.i = 0;
    this.chunks = [];
    this.state = 'N';
  }

  readline(line) {
    // judge says something is wrong.
    // set case to fail and return.
    if (line === '-1') {
      this.state = 'fail';
      return;
    }

    // first line tells us the limits of this case
    if (this.i === 0) {
      const chars = line.split(' ');
      this.N = parseInt(chars[0]);
      this.K = parseInt(chars[1]);
      // increment i
      this.i++;
      return;
    }

    // any line after the first line contains a chunk of case data

    // parse and store the current chunk
    const chars = line.split(' ');
    const chunk = [];
    for (let i = 0; i < chars.lenght; i++) {
      chunk.push(parseInt(chars[i]));
    }
    this.chunks.push(chunk);

    // solve the current chunk
    const result = this.solve(chunk);

    // output data to the judge
    console.log(result);

    // if this was the last fragment of the case, set state to 'done'
    // to end the case
    // todo: if K, make estimate and end case
    if (this.i === this.K+1) {
      this.state = 'done';
    }
    this.i++;
  }

  solver(chunk) {
    if (this.i <= this.K) {
      const isLastOperation = this.i === this.K;
      // choose teleport

      // else
      // consider operation
      const operation = "T 1"
      return operation
    }
    // on K+1, it's time to return the estimated answer
    const estimate = "1"
    return `E ${estimate}`

  }
}

//
// ProblemParser
//
class ProblemParser {
  constructor() {
    this.T = 0;
    this.curCaseIndex = 0;
    this.caseController = new InteractiveCaseController(1);
    this.state = 'T';
  }

  readline(line) {
    switch (this.state) {
      case 'T': {
        // read first line, assume it contains N
        // set number of Testcases
        this.T = parseInt(line);
        // set state, so next line will be handled by different function
        this.state = 'case';
        break;
      }

      case 'case': {
        // read any line other than the first
        // use caseParse to handle the contents
        this.caseController.readline(line);

        // if the case failed, fail the problem
        if (this.caseController.state === 'fail') {
          this.state = 'fail';
          return;
        }

        // if the case completed, increment current case index
        // set caseController to new object (with clean slate)
        if (this.caseController.state === 'done') {
          this.curCaseIndex += 1;
          this.caseController = new InteractiveCaseController(
            this.curCaseIndex + 1
          );
        }

        // wait for the next line
        break;
      }
    }

    // if all cases have been completed, set problem state to done
    // to end the program
    if (this.curCaseIndex === this.T) {
      this.state = 'done';
    }
  }
}

//
// Main
//
function main() {
  const readline = require('readline');
  const problemParser = new ProblemParser();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', line => {
    problemParser.readline(line);

    // keep reading lines, until state of problemParser changes
    // to 'done' or 'fail'
    // problemParser states : ['N','case','done','fail']
    if (problemParser.state === 'done' || problemParser.state === 'fail') {
      rl.close();
    }
  }).on('close', () => {
    process.exit(0);
  });
}

if (!module.parent) {
  main();
}

module.exports = {
  InteractiveCaseController,
  InteractiveCaseSolver,
};
