// N [3-9999]//odd
// K moves < N^2-1

/*
corners dont have shortcut
edges have one shortcut
shortcut delta decrease with 2 after each corner
path from 1 to end = (N^2 - 1) - (shortcutDelta - shortcutNum)
impossible if 
- K > N^2 - 1 // maxSteps
- K < 2*floor(N/2) // minSteps
- K diff is not even

rings = floor(N/2)
each ring has 1 opportunity for shortcut
each ring has 3 shortcut deltas
ring size = 2N + 2(N-1)
shortcut jump = 2N + 2(N-1) - 1

we dont want to brute force
binary search?

skip:
[[0,2,4,6],[8,10,12,14],[16,18,20,22],[24,26,28,30],[0,...,...,2N + 2(N-1) - 1]
amount of skip increases by 8 each ring
sum of n-1+n-2=n
greedy approach: add highest skip ring

given stretches S [1- floor(N/2)*4-1]
on stretch S, jump if:
diff > jump
destination is Si-4
jump = Si*2

move to mid
jump or walk to next mid?

*/
const LINES_PER_CASE = 1;

// ----------- HELPERS -----------------

// ----------- LOGIC -------------------
// -> dataSet []
// <- solution ""
const solveTestCase = dataSet => {
  const [N, K] = dataSet;
  const base = Math.pow(N, 2) - 1;
  const minK = 2 * Math.floor(N / 2);
  // K should be within range
  if (K < minK || K >= base) return 'IMPOSSIBLE';

  let diff = base - K;
  // jumping can only skip even number of steps
  if (diff % 2 !== 0) return 'IMPOSSIBLE';

  const jumps = [];
  const R = Math.floor(N / 2); //number of rings
  const edgeCount = R * 4 - 1;
  const edges = [];
  let curEdge = 0;
  while (curEdge < edgeCount) {
    const jump = 2 * edgeCount - 2 * curEdge;
    if (diff >= jump) {
      edges.push(curEdge);
      diff -= jump;
      curEdge += 4;
      continue
    }
    curEdge += 1

  }
  const ringSize = (ring) => {
    return 2*(N-ring) + 2*(N-ring-2)
  }
  // translate edges to room
  const edgeToRoom = (edge) => {
    const position = (edge/4)
    const ring = Math.floor(position)
    const partRing = position-ring
    let room = (N+1)/2 // middle of first edge
    // add outer rings
    for (let i = 0; i < ring; i++) {
      room += (ringSize(i) - 1)
    }
    // add part of ring that edge is on
    room += partRing * ringSize(ring)
    const jump = 2 * edgeCount - 2 * edge;
    return [room,room+jump+1]
  }
  const rooms = edges.map((edge)=>edgeToRoom(edge))
  let solution = `${rooms.length}`
  for (let roomTandem of rooms) {
    solution = solution + `\n${roomTandem[0]} ${roomTandem[1]}`
  }
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

// solved samples, failed because of typo (triple s)
// then, first testscase failed
// according to analysis, my solution is correct for all test sets,
// there must be a bug somewhere in the code