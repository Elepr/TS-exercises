function findLargest(numbers: number[]): number {
	let largest = numbers[0]

	for (let i = 1; i < numbers.length; i++) {
		if (numbers[i] > largest) largest = numbers[i]
	}
	return largest
}

// function findLargest(numbers: number[]): number { // this method may cause the number of arguments supported by the Javascript engine to reach the threshold limit.
//     return Math.max(...numbers)
// }

// function findLargest(numbers: number[]): number { // this method does not have the constraint of Math.max(...argumtent)
//     return numbers.reduce((a, b) => Math.max(a, b))
// }

console.log("findLargest :")
console.log("expected output (657) :", findLargest([12, 98, 34, 21, 657, 2, 31, 54, 29]))
console.log("expected output (-2) :", findLargest([-12, -98, -34, -21, -657, -2, -31, -54, -29]))
console.log("expected output (-12) :", findLargest([-12]))
