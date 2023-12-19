//https://github.com/ecgan/google-code-jam/blob/master/2018/1C/2-lollipop-shop/solution.js
'use strict';
const TEST_MODE = true;

// Helpers ------------------------------
const fs = require('fs');
const logPath = 'log.txt';

const createLog = () =>
  TEST_MODE &&
  fs.writeFile(logPath, 'LOG:' + '\n', err => {
    if (err) {
      console.error(err);
    }
  });
const log = content =>
  TEST_MODE &&
  fs.appendFile(logPath, content + '\n', err => {
    if (err) {
      console.error(err);
    }
  });
createLog();
// -----------------------------------------

const solveProblem() => {
  
}
//
// InteractiveCaseController
//
class InteractiveCaseController {
  constructor(caseId) {
    this.state = 'N';
    this.caseId = caseId;
    this.N = 0;

    this.i = 0;
    this.chunks = []
    this.total = 0;
    this.set = []
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

      // IF we have to start the interaction,
      // output data to judge here
      console.log("hello judge")

      // increment i
      this.i = this.i + 1;
      return;
    }
    // any line after the first line contains a chunk of case data

    // solve the case
    const result = this.solver();

    // output data to the judge
    console.log(result);

    // if this was the last fragment of the case, set state to 'done'
    // to end the case
    if (this.i === this.K + 1) {
      this.state = 'done';
    }
    this.i = this.i + 1;
  }

  solver() {
    return "my solution"
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
    log(line);
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

main();
