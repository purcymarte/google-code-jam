//https://github.com/ecgan/google-code-jam/blob/master/2018/1C/2-lollipop-shop/solution.js
'use strict';
const TEST_MODE = false;

// Helpers ------------------------------
function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

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
      log(line);
      const chars = line.split(' ');
      // log('chars' + line)
      this.N = parseInt(chars[0]);
      this.K = parseInt(chars[1]);

      // create LUTs
      // one for each room's number of passages
      // one for each room's weight
      const rooms = [];
      for (let i = 0; i < this.N; i++) {
        //random shuffle
        //pick first x items
        rooms.push(i + 1);
      }
      this.randomSubset = getRandomSubarray(rooms, Math.floor(this.K / 2));
      this.weightedSamples = [];
      // increment i
      this.i = this.i + 1;
      return;
    }

    // any line after the first line contains a chunk of case data

    // parse and store the current chunk
    const chars = line.split(' ');
    const chunk = [];
    for (let i = 0; i < chars.length; i++) {
      log("chunk: " + parseInt(chars[i]))
      chunk.push(parseInt(chars[i]));
    }
    this.chunks.push(chunk);


    // solve the current chunk
    const result = this.solver(chunk);

    // output data to the judge
    console.log(result);
    // log(`operation ${this.i} of ${this.K}`)

    // if this was the last fragment of the case, set state to 'done'
    // to end the case
    // todo: if K, make estimate and end case
    if (this.i === this.K + 1) {
      this.state = 'done';
    }
    this.i = this.i + 1;
  }

  solver(chunk) {
    if (this.i <= this.K) {
      const isLastOperation = this.i === this.K;

      // choose teleport if i=uneven
      if (this.i % 2) {
        log("this.i: " + chunk[1])
        // read input from judge
        // previous operation was teleport
        this.weightedSamples.push({
          P: chunk[1],
          W: 1,
        });
        return 'W';
      }
      // else
      // read input from judge
      this.weightedSamples.push({
        P: chunk[1],
        W: 1*this.weightedSamples[this.i-2].P/chunk[1],
      });
      const destination = this.randomSubset.pop();

      const operation = 'T 1';
      return `T ${destination}`;
    }
    // on K+1, it's time to return the estimated answer
    
    let total = 0;
    let totalWeight = 0
    for(let i=0;i<this.weightedSamples.length;i++) {
      log("weight sample: " + this.weightedSamples[i].W + this.weightedSamples[i].P)
      totalWeight = totalWeight + this.weightedSamples[i].W
      total = total + this.weightedSamples[i].P*this.weightedSamples[i].W
    }
    const weightedAverage = total/totalWeight
    const estimate = Math.round(weightedAverage * this.N / 2)
    return `E ${estimate}`;
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
    log(this.curCaseIndex + ' -> ' + `reading line:${line}`);
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
          log('CASE FAILED');
          this.state = 'fail';
          return;
        }

        // if the case completed, increment current case index
        // set caseController to new object (with clean slate)
        if (this.caseController.state === 'done') {
          log('CASE = DONE');
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
