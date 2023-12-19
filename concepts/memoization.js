// Memoization is a way to lower a function's time cost in exchange for space cost
// A lookup table (LUT) is an array that replaces runtime computation with a simpler array indexing operation.

// recursive function, takes O(n!) to resolve
// builds stack upon stack upon stack
const factorial = (n) => {
    if (n===0) return 1
    return factorial(n-1) * n 
}



// memoized recursive function
// stores stuff in lookup table
const LUT = []
const factorialMem = (n) => {
    if (n===0) return 1
    if (lookupTable[n]) return lookupTable[n]
    let x = factorial(n-1) * n // n=4, i = 0 \\ n=3, i=1// n=2 i=2 // 
    LUT.push(x)
    return x
}
factorialMem(3)
console.log(LUT)

// if factorialMem(5) is called. the first time it takes just as long as the other function.
// if factorialMem(4) is called, the LUT can be used so it's faster
// if factorialMem(6) is called, LUT can be used for 5!
