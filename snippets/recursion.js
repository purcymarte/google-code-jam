
// if recursive function overflows the stack
// it can be replaced with a trampoline.
// it is a loop, mimimicing recursion, bypassing stack issues.
const trampoline = fn => (...args) => {
  let result = fn(...args)
  //repeatedly call the function till you hit your base case
  while (typeof result === 'function') {
    result = result();
  }
  
  return result;
}

// trampoline usage:
const recursiveFunction = x => {
  if(x > 500000) {
      console.log(x);
      return; 
  }
  return ()=> recursiveFunction(x + 1); //you return a function, it hasn't been called yet
}
// store fn in variable
var t = trampoline(recursiveFunction);
// call function through variable
// t(1);

// ---------------------------------------
// iteration vs recursion
// iteration (loop until condition):
// good performance
const countToTen = (num = 1) => {
	while (num <= 10) {
		console.log(num)
		n++
	}
}
// recursion:
// call self until condition
// clean, minimal code, suboptimal performance (caling functions is expensive)
// const recurToTen = (num = 1) => {
// 	if (num > 10) return
// 	// console.log num;
//     recurToTen(num++) //calls itself
// }

// tail end recursion
const go = (num, acc) => {
	if (num > 10) return acc
	return go(num+1,acc+num)
}
const recurToTen = (num = 1) => go (num, 0)
console.log(recurToTen())