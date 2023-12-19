// Object ------------------

// get keys
const getKeys = (obj) => Object.keys(obj);

// get values
const getValues = (obj) => Object.values(obj);

// get key/value pairs
// -> obj
// <- [[key,value],...]
const ObjectToEntries = (obj) => {
	return Object.entries(obj);
};

// create object from entries
const EntriesToObject = (entries) => {
	return Object.fromEntries(entries);
};

// obj with objects to array with objects
// source: https://stackoverflow.com/questions/48604506/javascript-object-as-a-type-of-mini-database
const objToArr = (store) => Object.keys(store).map(el => store[el])

// Array -------------
// new array from combining two or more arrays
const concat = (arr1, arr2) => {
	return arr1.concat(arr2);
};

// test every item in array against condition. returns true/false
const testEvery = (arr, testForEveryItem) => {
	return arr.every(testForEveryItem);
};

// filter
// returns new array with items that pass test
const filter = (arr, test) => {
	return arr.filter(test);
};

// find
// returns first item that passes test
const find = (arr, test) => {
	return arr.find(test);
};

// find index
// returns index of first item that passes test, otherwise returns -1
const findIndex = (arr, test) => {
	return arr.findIndex(test);
};

// forEach
// executes function for each element
const forEach = (arr, fn) => {
	return arr.forEach(fn);
};

// includes
// determines if a certain value is amongst elements
const includes = (arr, value) => {
	return arr.includes(value, /*[startSearchingFromIndex]*/);
};

// index of first occurance of included value
// return index or -1 if not found
const indexOf = (arr, value) => {
	return arr.indexOf(value, /*[startSearchingFromIndex]*/);
};

// indices of
// return list of all indices
const indicesOf = (arr, value) => {
	const indices = [];
	let idx = arr.indexOf(value);
	while (idx != -1) {
		indices.push(idx);
		idx = arr.indexOf(value, idx + 1);
	}
	return indices
};

// join
// returns new string from concatenated arr elements
const join = (arr, separator) => {
	return arr.join(separator)
}

// map
// returns new array based on calling a function on every element of array
const map = (arr, fn) => {
	return arr.map(fn)
}

// SORTING
// sort array of objects 
const sortObjects = (arr = [], {key, order} = {key: "id", order: "desc"}) => {
	return arr.sort((a,b) => {
		return order === "asc" ? a[key] - b[key] : b[key] - a[key]
	})
}

// returns sum of array of numbers
const sum = (arr) => {
	let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}
 // sort array in all permutations
const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}

// get random subarray
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}