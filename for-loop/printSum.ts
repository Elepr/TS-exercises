function printSum(numbers: number[]): void {
	let result = 0

	for (let i = 0; i < numbers.length; i++) {
		result += numbers[i]
	}
	console.log(result)
}

console.log("printSum :")
printSum([10, 5, 3])
// expected output : 18
