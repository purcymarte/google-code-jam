//https://github.com/ecgan/google-code-jam/blob/master/2018/1C/2-lollipop-shop/solution.js
'use strict';
const TEST_MODE = true;

// Helpers ------------------------------
function dec2bin(dec){
  return (dec >>> 0).toString(2);
}
// returns sum of array of numbers
const sum = (arr) => {
  let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
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

const solveProblem() => {
  
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
    this.chunks = []
    this.total = 0;
    this.set = []
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
      const numList = []
      // increment i
      for (let i = 0; i < 30; i++) {
        numList.push(`${Math.pow(2,i)} `)
        this.total += Math.pow(2,i)
      }
      for (let i = 30; i < this.N; i++) {
        numList.push(`${Math.pow(2,29)+i} `)
        this.set.push(Math.pow(2,29)+i)
        this.total += Math.pow(2,29)+i
      }
      this.i = this.i + 1;
      // return list of low numbers to judge
      console.log(numList.join(" "))
      return;
    }
    // any line after the first line contains a chunk of case data

    // parse and store the current chunk
    const chars = line.split(' ');
    for (let i = 0; i < chars.length; i++) {
      this.chunks.push(parseInt(chars[i]));
    }
    // solve the case
    const result = this.solver();

    // output data to the judge
    console.log(result);

    // if this was the last fragment of the case, set state to 'done'
    // to end the case
    // todo: if K, make estimate and end case
    if (this.i === this.K + 1) {
      this.state = 'done';
    }
    this.i = this.i + 1;
  }

  solver() {
    const set = []
    for (let i = 0; i < this.chunks.length; i++) {
      this.set.push(this.chunks[i])
      this.total += this.chunks[i]
    }
    this.set.sort((a,b) => a-b)
    // define target sum for subset
    const oldTotal = this.total
    this.total = this.total/2 
    const ans = []
    // add numbers to subset, keeping diff < 2^30
    for (let i = 0; i < this.set.length; i++) {
      if (this.total > this.set[i]) {
        this.total -= this.set[i]
        ans.push(this.set[i])
      }
    }
    // diff is too large! => fixed
    // bitwise comparison
    // todo: fix bitwise comparison
    // check why difference is not reducing to zero
    // todo: fix bug in # of testcases
    // log("total bin" + dec2bin(this.total))
    // log("total one" + dec2bin(Math.pow(2,0)))

    for (let i = 0; i < 30; i++) {
      if (this.total & (Math.pow(2,i)>>>0)) {
        // log("TRUE: "+ i)
        // log("2^" +i+ " is present")
        // if bit is present in total, we can asume it's not present in answer
        ans.push(Math.pow(2,i))        
      }
    }
    // log("diff final: "+ Math.abs(sum(ans) - oldTotal/2))

    return ans.join(" ")
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

// analysis:
// did not know the idea of bitwise comparison. 
// did not know the method either.
// https://www.youtube.com/watch?v=F5ZPVbcOSDM helped
// blocking understanding: 
// a sequence of binary numbers can construct ANY number in its range
// this problem has 3 steps:
// 0: keep 30 numbers apart: [2^0 - 2^29]
// 1: using the 170 remaining numbers, make a subset that is:
//   - less than half the total sum
//   - not more than 2^30 less than half the total sum
// 2: fill the gap (<2^30) using the binary representation
//   of the numbers that were kept apart. The key is that any gap
//   smaller than 2^30 can be filled. 
// n.b. the remaining binary numbers would belong to the other subset (but we don't)
// have to care about that.
