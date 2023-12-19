const pow = (b,e) => Math.pow(b,e)
const sqrt = (n) => Math.sqrt(n)
const PI = () => Math.PI
const cos = (x) => Math.cos(x)
const sin = (x) => Math.sin(x)
const tan = (x) => Math.tan(x)
// radians expressed in pi. (0-1)
const acos = (x) => Math.acos(x)
const asin = (x) => Math.asin(x)
const atan = (x) => Math.atan(x)

const trunc = (float) => Math.trunc(float) // returns int part

// semi random float between 0-1
const random = () => Math.random()

// returns largest int less than a given number
const floor = (float) => Math.floor(float)
const ceil = (float) => Math.ceil(float)

// return closest int to float
const round = (float) => Math.round(float)

// returns absolute value (positive or zero)
const abs = (n) => Math.abs(n)

const randomInt = (max) => {
	return Math.floor(Math.random() * max);
}

// log(x) in javascript is equal to ln(x) in math!!
// log returns the power:
// 2^4 = 16 ---> log2(16) = 4
// 3^4 = 91 ---> log3(91) = 4

const ln = (x) => Math.log(x) // ln
const log2 = (x) => Math.log2(x) // log base 2
const log10 = (x) => Math.log10(x) // log base 10

const log = (base, x) => {
	return log(x) / log(base) // change of base formula
}