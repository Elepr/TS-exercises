function printSum(numbers: number[]): void {
	let result = 0

	let i = 0
	while (i < numbers.length) {
		result += numbers[i]
		i++
	}
	console.log(result)
}

console.log("printSum :")
printSum([10, 5, 3])
// expected output : 18
