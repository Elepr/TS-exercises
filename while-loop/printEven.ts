function printEven(numbers: number[]): void {
	let i = 0
	while (i < numbers.length) {
		if (numbers[i] % 2 == 0) console.log(numbers[i])
		i++
	}
}

console.log("printEvent :")
printEven([13, 23, 12, 45, 22, 48, 66, 100])
// expected output : 
//   12
//   22
//   48
//   66
//   100
